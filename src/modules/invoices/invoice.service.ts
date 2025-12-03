// src/modules/invoices/invoice.service.ts

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { InvoiceItem } from './invoice-items/invoice-item.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Product } from '../products/product.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(InvoiceItem) private itemRepo: Repository<InvoiceItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  private async getProduct(id: number) {
    const p = await this.productRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException(`Product ${id} not found`);
    return p;
  }

  // ---------------- CREATE ----------------
  async create(dto: CreateInvoiceDto) {
    const invoice = await this.invoiceRepo.save({
      type: dto.type,
      supplier: dto.supplier,
      customer: dto.customer,
    });

    for (const item of dto.items) {
      const product = await this.getProduct(item.product_id);

      if (dto.type === 'purchase') product.quantity += item.quantity;
      else {
        if (product.quantity < item.quantity)
          throw new BadRequestException(`Not enough stock for ${product.name}`);
        product.quantity -= item.quantity;
      }

      await this.productRepo.save(product);
      await this.itemRepo.save({ invoice, product, quantity: item.quantity, price: item.price });
    }

    return this.findOne(invoice.id);
  }

  // ---------------- GET LIST ----------------
  async findAll(type?: 'purchase' | 'sale') {
  const where = type ? { type } : undefined;

  return this.invoiceRepo.find({
    where,
    relations: ['items', 'items.product'],
    order: { id: 'DESC' },
  });
}



  // ---------------- GET ONE ----------------
  async findOne(id: number) {
    const invoice = await this.invoiceRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });

    if (!invoice) throw new NotFoundException(`Invoice ${id} not found`);
    return invoice;
  }

  // ---------------- PATCH ----------------
  async update(id: number, data: Partial<Invoice>) {
    const invoice = await this.findOne(id);

    if (invoice.type === 'purchase') invoice.supplier = data.supplier ?? invoice.supplier;
    if (invoice.type === 'sale') invoice.customer = data.customer ?? invoice.customer;

    return this.invoiceRepo.save(invoice);
  }

  // ---------------- DELETE + Reverse Stock ----------------
  async remove(id: number) {
    const invoice = await this.findOne(id);

    for (const item of invoice.items) {
      const product = item.product;

      if (invoice.type === 'sale') product.quantity += item.quantity;       // إرجاع الكميات
      if (invoice.type === 'purchase') product.quantity -= item.quantity;   // إلغاء إضافة المخزون

      if (product.quantity < 0) product.quantity = 0;

      await this.productRepo.save(product);
    }

    return this.invoiceRepo.remove(invoice);
  }
}
