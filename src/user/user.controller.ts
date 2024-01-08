/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateUserDTO } from './dto/create-user.dto';
import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
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

    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'Usuário criado com sucesso',
    };
  }

  /* @Body() - Decorator responsável por guardar dados inseridos no corpo da requisição. */
  /* Parâmetro userData - Recebe os dados vindos do Body da requisição. */

  @Get()
  async ListUser() {
    const savedUsers = await this.userRepository.list();

    const listUser = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.name),
    );

    return listUser;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.upadate(id, newData);

    return {
      user: updatedUser,
      message: 'Usuário atualizado com sucesso',
    };
  }
}
