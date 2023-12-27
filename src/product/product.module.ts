/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { ProductRepository } from './product-repository/product-repository';
import { ProductController } from './product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductRepository],
})
export class ProductModule {}
