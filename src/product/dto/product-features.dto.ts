/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductFeaturesDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  description: string;
}
