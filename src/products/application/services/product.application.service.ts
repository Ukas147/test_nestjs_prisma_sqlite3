import { Injectable, Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import type { ProductRepositoryInterface } from '../../domain/interfaces/product.domain.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductServiceInterface } from '../interfaces/product.service.interface';
import { ProductAdapter } from '../adapters/product.adapter';
import { PRODUCT_REPOSITORY_TOKEN } from '../../domain/repositories/product.repository.token';

@Injectable()
export class ProductApplicationService implements ProductServiceInterface {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Criar produto
    const productData = await this.productRepository.create(
      createProductDto.name,
      createProductDto.price,
      createProductDto.description,
    );

    return ProductAdapter.toDomain(productData);
  }

  async findById(id: number): Promise<Product> {
    const productData = await this.productRepository.findById(id);
    
    if (!productData) {
      throw new Error('Produto não encontrado');
    }

    return ProductAdapter.toDomain(productData);
  }

  async findAll(): Promise<Product[]> {
    const productsData = await this.productRepository.findAll();
    return productsData.map(productData => ProductAdapter.toDomain(productData));
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    // Verificar se produto existe
    const existingProductData = await this.productRepository.findById(id);
    if (!existingProductData) {
      throw new Error('Produto não encontrado');
    }

    // Atualizar produto
    const productData = await this.productRepository.update(
      id,
      updateProductDto.name || existingProductData.name,
      updateProductDto.price !== undefined ? updateProductDto.price : existingProductData.price,
      updateProductDto.description || existingProductData.description,
    );

    return ProductAdapter.toDomain(productData);
  }

  async delete(id: number): Promise<void> {
    // Verificar se produto existe
    const existingProductData = await this.productRepository.findById(id);
    if (!existingProductData) {
      throw new Error('Produto não encontrado');
    }

    // Deletar produto
    await this.productRepository.delete(id);
  }
}


