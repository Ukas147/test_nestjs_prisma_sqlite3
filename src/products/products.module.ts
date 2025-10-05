import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductController } from './presentation/controllers/product.controller';
import { PrismaProductRepository } from './infrastructure/repositories/prisma-product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetAllProductsUseCase } from './application/use-cases/get-all-products.use-case';
import { ProductRepository } from './domain/repositories/product.repository.interface';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    CreateProductUseCase,
    GetAllProductsUseCase,
  ],
  exports: [ProductRepository],
})
export class ProductsModule {}
