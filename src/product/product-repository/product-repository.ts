/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private products = [];

  async save(product: any) {
    this.products.push(product);
  }

  async list() {
    return this.products;
  }
}
