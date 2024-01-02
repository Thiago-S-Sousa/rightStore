/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './user-repository/user-repository';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async CreateUser(@Body() userData: CreateUserDTO) {
    this.userRepository.save(userData);

    return userData;
  }

  /* @Body() - Decorator responsável por guardar dados inseridos no corpo da requisição. */
  /* Parâmetro userData - Recebe os dados vindos do Body da requisição. */

  @Get()
  async ListUser() {
    return this.userRepository.list();
  }
}
