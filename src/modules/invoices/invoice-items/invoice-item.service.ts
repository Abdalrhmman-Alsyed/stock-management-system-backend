import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { Product } from '../../products/product.entity';
import { Invoice } from '../invoice.entity';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';

@Injectable()
export class InvoiceItemsService {
  constructor(
    @InjectRepository(InvoiceItem) private itemRepo: Repository<InvoiceItem>,
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async addItem(invoiceId: number, dto: CreateInvoiceItemDto) {
    const invoice = await this.invoiceRepo.findOne({ where: { id: invoiceId } });
    if (!invoice) throw new NotFoundException('Invoice not found');

    const product = await this.productRepo.findOne({ where: { id: dto.product_id } });
    if (!product) throw new NotFoundException('Product not found');

    if (invoice.type === 'sale') {
      if (product.quantity < dto.quantity) throw new BadRequestException('Not enough stock');
      product.quantity -= dto.quantity;
    } else {
      product.quantity += dto.quantity;
    }

    await this.productRepo.save(product);

    return this.itemRepo.save({ invoice, product, quantity: dto.quantity, price: dto.price });
  }

  async updateItem(id: number, dto: UpdateInvoiceItemDto) {
    const item = await this.itemRepo.findOne({ where: { id }, relations: ['invoice', 'product'] });
    if (!item) throw new NotFoundException('Invoice item not found');

const newQuantity = dto.quantity ?? item.quantity;
const diff = newQuantity - item.quantity;


    if (item.invoice.type === 'sale') item.product.quantity -= diff;
    else item.product.quantity += diff;

    await this.productRepo.save(item.product);
    item.quantity = dto.quantity ?? item.quantity;
    item.price = dto.price ?? item.price;

    return this.itemRepo.save(item);
  }

  async removeItem(id: number) {
    const item = await this.itemRepo.findOne({ where: { id }, relations: ['invoice', 'product'] });
    if (!item) throw new NotFoundException();

    if (item.invoice.type === 'sale') item.product.quantity += item.quantity;
    else item.product.quantity -= item.quantity;

    await this.productRepo.save(item.product);
    await this.itemRepo.remove(item);
  }
}
