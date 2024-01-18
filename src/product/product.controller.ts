/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductRepository } from './product-repository/product-repository';
import { ProductEntity } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Post()
  async createNewProduct(@Body() productData: CreateProductDTO) {
    const product = new ProductEntity();

    product.id = randomUUID();
    product.name = productData.name;
    product.userId = productData.userId;
    product.value = productData.value;
    product.amount = productData.amount;
    product.description = productData.description;
    product.category = productData.category;
    product.characteristics = productData.characteristics;
    product.images = productData.images;

    const registeredProduct = this.productRepository.save(product);

    return registeredProduct;
  }

  @Get()
  async listAllProducts() {
    return this.productRepository.listAll();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    const productChanged = await this.productRepository.update(id, productData);

    return {
      message: 'produto atualizado com sucesso',
      product: productChanged,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const productRemoved = await this.productRepository.remove(id);

    return {
      message: 'produto removido com sucesso',
      product: productRemoved,
    };
  }
}
