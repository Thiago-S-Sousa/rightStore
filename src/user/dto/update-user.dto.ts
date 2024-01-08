/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'O nome não deve ser vazio' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @EmailIsUnique({ message: 'Email já cadastrado' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
  @IsOptional()
  password: string;
}
