import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository.interface';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string, price: number, description: string): Promise<Product> {
    const productData = await this.prisma.product.create({
      data: {
        name,
        price,
        description,
      },
    });

    return Product.create(
      productData.id,
      productData.name,
      productData.price,
      productData.description,
      productData.createdAt,
      productData.updatedAt,
    );
  }

  async findById(id: number): Promise<Product | null> {
    const productData = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!productData) {
      return null;
    }

    return Product.create(
      productData.id,
      productData.name,
      productData.price,
      productData.description,
      productData.createdAt,
      productData.updatedAt,
    );
  }

  async findAll(): Promise<Product[]> {
    const productsData = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return productsData.map(productData =>
      Product.create(
        productData.id,
        productData.name,
        productData.price,
        productData.description,
        productData.createdAt,
        productData.updatedAt,
      ),
    );
  }

  async update(id: number, name: string, price: number, description: string): Promise<Product> {
    const productData = await this.prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
      },
    });

    return Product.create(
      productData.id,
      productData.name,
      productData.price,
      productData.description,
      productData.createdAt,
      productData.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
