import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Product } from "../products/entities/product.entity";
import { Invoice } from "../invoices/entity/invoice.entity";

import { ReportsService } from "./report.service";
import { ReportsController } from "./report.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Invoice])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
