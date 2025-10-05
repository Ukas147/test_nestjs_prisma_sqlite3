import { Product } from '../../domain/entities/product.entity';

export class ProductAdapter {
  static toDomain(productData: any): Product {
    return Product.create(
      productData.id,
      productData.name,
      productData.price,
      productData.description,
      productData.createdAt,
      productData.updatedAt,
    );
  }

  static toPersistence(product: Product): any {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toResponse(product: Product): any {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      formattedPrice: product.getFormattedPrice(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}


