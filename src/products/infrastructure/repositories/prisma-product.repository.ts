import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProductRepositoryInterface, ProductData } from '../../domain/interfaces/product.domain.interface';

@Injectable()
export class PrismaProductRepository implements ProductRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string, price: number, description: string): Promise<ProductData> {
    const productData = await this.prisma.product.create({
      data: {
        name,
        price,
        description,
      },
    });

    return {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
    };
  }

  async findById(id: number): Promise<ProductData | null> {
    const productData = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!productData) {
      return null;
    }

    return {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
    };
  }

  async findAll(): Promise<ProductData[]> {
    const productsData = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return productsData.map(productData => ({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
    }));
  }

  async update(id: number, name: string, price: number, description: string): Promise<ProductData> {
    const productData = await this.prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
      },
    });

    return {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
    };
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}


