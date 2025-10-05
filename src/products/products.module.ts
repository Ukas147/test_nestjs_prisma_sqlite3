import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductController } from './presentation/controllers/product.controller';
import { PrismaProductRepository } from './infrastructure/repositories/prisma-product.repository';
import { ProductApplicationService } from './application/services/product.application.service';
import { PRODUCT_REPOSITORY_TOKEN } from './domain/repositories/product.repository.token';
import { PRODUCT_SERVICE_TOKEN } from './application/interfaces/product.service.token';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useClass: PrismaProductRepository,
    },
    {
      provide: PRODUCT_SERVICE_TOKEN,
      useClass: ProductApplicationService,
    },
  ],
  exports: [PRODUCT_REPOSITORY_TOKEN, PRODUCT_SERVICE_TOKEN],
})
export class ProductsModule {}


