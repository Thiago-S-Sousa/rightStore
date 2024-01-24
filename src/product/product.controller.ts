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

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createNewProduct(@Body() productData: CreateProductDTO) {
    const registeredProduct =
      await this.productService.createProduct(productData);

    return {
      message: 'Produto cadastrado com sucesso',
      product: registeredProduct,
    };
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
