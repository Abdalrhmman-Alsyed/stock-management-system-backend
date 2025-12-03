import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { InvoiceItem } from './invoice-items/invoice-item.entity';
import { Product } from '../products/product.entity';
import { InvoicesController } from './invoice.controller';
import { InvoiceItemsController } from './invoice-items/invoice-item.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceItemsService } from './invoice-items/invoice-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem, Product])],
  controllers: [InvoicesController, InvoiceItemsController],
  providers: [InvoiceService, InvoiceItemsService],
})
export class InvoiceModule {}
