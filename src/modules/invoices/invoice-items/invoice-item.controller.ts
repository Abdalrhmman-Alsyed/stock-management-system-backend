import { Controller, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-item.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';

@Controller()
export class InvoiceItemsController {
  constructor(private service: InvoiceItemsService) {}

  @Post('invoices/:invoiceId/items')
  addItem(@Param('invoiceId', ParseIntPipe) invoiceId: number, @Body() dto: CreateInvoiceItemDto) {
    return this.service.addItem(invoiceId, dto);
  }

  @Patch('invoice-items/:id')
  updateItem(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInvoiceItemDto) {
    return this.service.updateItem(id, dto);
  }

  @Delete('invoice-items/:id')
  removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.service.removeItem(id);
  }
}
