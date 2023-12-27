/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';

import { ProductRepository } from './product-repository/product-repository';

@Controller('product')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: any) {
    this.productRepository.save(productData);

    return productData;
  }

  @Get()
  async listProduct() {
    return this.productRepository.list();
  }
}
