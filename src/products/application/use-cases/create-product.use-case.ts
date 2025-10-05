import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository.interface';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.create(
      createProductDto.name,
      createProductDto.price,
      createProductDto.description,
    );
  }
}
