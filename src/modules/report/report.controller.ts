import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './report.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('stock-levels')
  stockLevels() {
    return this.service.viewStockLevels();
  }

  @Get('invoices')
  invoices() {
    return this.service.viewInvoicesAndMovements();
  }
}
