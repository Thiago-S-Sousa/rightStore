/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não deve ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @EmailIsUnique({ message: 'Email já cadastrado' })
  email: string;

  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
  password: string;
}
