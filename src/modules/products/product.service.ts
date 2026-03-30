import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../products/entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
async create(createProductDto: CreateProductDto): Promise<any> {
  try {
    const { category_id, ...productData } = createProductDto;
    
    const product = this.productRepository.create({
      ...productData,
      category: { id: category_id } as any,
    });

    return await this.productRepository.save(product);
  } catch (error) {
    // هذا السطر هو الأهم الآن
    console.log("---------------- START ERROR ----------------");
    console.error(error); 
    console.log("---------------- END ERROR ----------------");
    throw error; 
  }
}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new Error("Product not found");
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new Error("Product not found");
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    if (!product) {
      throw new Error("Product not found");
    }
    await this.productRepository.remove(product);
  }

  async payProductByUser(product_id: number, user_id: number) {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
      relations: ["products"],
    });

    const product = await this.productRepository.findOne({
      where: { id: product_id },
    });

    if (!user) return "user not found";
    if (!product) return "product not found";

    user.products.push(product);
    return this.userRepository.save(user);
  }
}
