import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "./entity/invoice.entity";
import { Product } from "../products/entities/product.entity";
import { InvoicesController } from "./invoice.controller";
import { InvoiceService } from "./invoice.service";
@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Product])],
  controllers: [InvoicesController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
