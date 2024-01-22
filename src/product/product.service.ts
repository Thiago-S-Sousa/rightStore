/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductListDTO } from './dto/product-list.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productEntity: ProductEntity) {
    await this.productRepository.save(productEntity);
  }

  async listProducts() {
    const savedProducts = await this.productRepository.find({
      relations: {
        images: true,
        characteristics: true,
      },
    });
    const listOfProducts = savedProducts.map(
      (product) =>
        new ProductListDTO(
          product.id,
          product.name,
          product.value,
          product.amount,
          product.description,
          product.characteristics,
          product.images,
          product.category,
        ),
    );
    return listOfProducts;
  }

  async updateProducts(id: string, newData: UpdateProductDTO) {
    const productEntity = await this.productRepository.findOneBy({ id });
    Object.assign(productEntity, newData);
    await this.productRepository.save(productEntity);
  }

  async deleteProducts(id: string) {
    await this.productRepository.delete(id);
  }
}
