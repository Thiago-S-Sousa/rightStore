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
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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

    const registeredProduct = this.productService.createProduct(product);

    return registeredProduct;
  }

  @Get()
  async listAllProducts() {
    return this.productService.listProducts();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    const productChanged = await this.productService.updateProducts(
      id,
      productData,
    );

    return {
      message: 'produto atualizado com sucesso',
      product: productChanged,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const productRemoved = await this.productService.deleteProducts(id);

    return {
      message: 'produto removido com sucesso',
      product: productRemoved,
    };
  }
}
