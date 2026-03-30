import { Product } from "../../../modules/products/entities/product.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image?: string; // optional

  @Column({ default: 0 })
  stock: number;

  @OneToMany(() => Product, (product) => product.category)
  product: Product;
}
