import { Category } from 'src/modules/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from 'src/modules/location/entities/location.entity';

// import { Category } from '../category/category.entity';
// import { Location } from '../location/location.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barcode: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Location, location => location.products)
  @JoinColumn({ name: 'location_id' })
  location: Location;
}
