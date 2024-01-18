/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { ProductEntity } from '../product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  listAll() {
    return this.products;
  }

  save(productData: ProductEntity) {
    this.products.push(productData);
    return productData;
  }

  private searchById(id: string) {
    const possibleProduct = this.products.find((product) => product.id === id);

    if (!possibleProduct) {
      throw new Error('Produto não existe');
    }

    return possibleProduct;
  }

  async update(id: string, productData: Partial<ProductEntity>) {
    const dataNotUpdatable = ['id', 'userId'];
    const product = this.searchById(id);
    Object.entries(productData).forEach(([key, value]) => {
      if (dataNotUpdatable.includes(key)) {
        return;
      }
      product[key] = value;
    });

    return product;
  }

  async remove(id: string) {
    const productRemoved = this.searchById(id);
    this.products = this.products.filter((product) => product.id !== id);
    return productRemoved;
  }
}
