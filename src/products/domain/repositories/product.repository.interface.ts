import { Product } from '../entities/product.entity';

export interface ProductRepository {
  create(name: string, price: number, description: string): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(id: number, name: string, price: number, description: string): Promise<Product>;
  delete(id: number): Promise<void>;
}
