/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateUserDTO } from './dto/create-user.dto';
import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async CreateUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.name = userData.name;
    userEntity.password = userData.password;
    userEntity.id = uuid();

    this.userService.createUsers(userEntity);

    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'Usuário criado com sucesso',
    };
  }

  /* @Body() - Decorator responsável por guardar dados inseridos no corpo da requisição. */
  /* Parâmetro userData - Recebe os dados vindos do Body da requisição. */

  @Get()
  async ListUser() {
    const savedUsers = await this.userService.listUsers();

    return savedUsers;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userService.updateUsers(id, newData);

    return {
      user: updatedUser,
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const userRemoved = await this.userService.deleteUsers(id);

    return {
      user: userRemoved,
      message: 'Usuário removido com sucesso',
    };
  }
}
