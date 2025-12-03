import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../products/product.entity';
import { Invoice } from '../invoices/invoice.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
  ) {}

  async viewStockLevels() {
    return this.productRepo.find();
  }

  async viewInvoicesAndMovements() {
    return this.invoiceRepo.find({ relations: ['items', 'items.product'] });
  }
}
