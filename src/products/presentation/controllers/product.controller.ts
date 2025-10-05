import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { GetAllProductsUseCase } from '../../application/use-cases/get-all-products.use-case';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.createProductUseCase.execute(createProductDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    return await this.getAllProductsUseCase.execute();
  }
}
