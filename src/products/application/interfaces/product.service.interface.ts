import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export interface ProductServiceInterface {
  create(createProductDto: CreateProductDto): Promise<Product>;
  findById(id: number): Promise<Product>;
  findAll(): Promise<Product[]>;
  update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
  delete(id: number): Promise<void>;
}


