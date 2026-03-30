import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/entities/product.entity";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
