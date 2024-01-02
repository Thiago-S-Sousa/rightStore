/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { ProductFeaturesDTO } from './product-features.dto';
import { ProductImageDTO } from './product-image.dto';

export class CreateProductDTO {
  @IsNotEmpty({ message: 'O nome não deve ser vazio' })
  name: string;

  @IsNotEmpty({ message: 'O valor não deve ser vazio' })
  @IsNumber()
  value: number;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  description: string;

  @IsOptional()
  features: ProductFeaturesDTO[];

  @IsOptional()
  images: ProductImageDTO[];

  @IsNotEmpty({ message: 'A categoria não deve ser vazia' })
  category: string;
}
