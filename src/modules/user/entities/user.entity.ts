import { Exclude } from "class-transformer";
import { Product } from "src/modules/products/entities/product.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  @Exclude()
  passwordHash: string;

  @Column()
  role: string; // "MANAGER" | "STOREKEEPER"

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Product, (product) => product.users)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
