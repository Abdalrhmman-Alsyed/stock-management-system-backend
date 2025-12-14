import { Category } from "src/modules/category/entities/category.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Location } from "../../../modules/location/entities/location.entity";
import { User } from "../../../modules/user/entities/user.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barcode: string;

  @Column()
  quantity: number;

  @ManyToMany(() => User, (user) => user.products)
  @JoinTable({
    name: "prodcut_user_invoice",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  users: User[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;
}
