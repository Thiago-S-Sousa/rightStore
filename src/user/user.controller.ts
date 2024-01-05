/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './user-repository/user-repository';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async CreateUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.name = userData.name;
    userEntity.password = userData.password;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);

    return { id: userEntity.id, message: 'Usuário criado com sucesso' };
  }

  /* @Body() - Decorator responsável por guardar dados inseridos no corpo da requisição. */
  /* Parâmetro userData - Recebe os dados vindos do Body da requisição. */

  @Get()
  async ListUser() {
    return this.userRepository.list();
  }
}
