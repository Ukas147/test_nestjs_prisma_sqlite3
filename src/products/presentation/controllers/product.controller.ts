import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import type { ProductServiceInterface } from '../../application/interfaces/product.service.interface';
import { ProductAdapter } from '../../application/adapters/product.adapter';
import { PRODUCT_SERVICE_TOKEN } from '../../application/interfaces/product.service.token';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productService: ProductServiceInterface,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productService.create(createProductDto);
      return ProductAdapter.toResponse(product);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return products.map(product => ProductAdapter.toResponse(product));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await this.productService.findById(id);
      return ProductAdapter.toResponse(product);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.productService.update(id, updateProductDto);
      return ProductAdapter.toResponse(product);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.productService.delete(id);
      return { message: 'Produto deletado com sucesso' };
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}


