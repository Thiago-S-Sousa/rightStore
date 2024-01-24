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

import { CreateUserDTO } from './dto/create-user.dto';
import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async CreateUser(@Body() userData: CreateUserDTO) {
    const userCreated = await this.userService.createUsers(userData);

    return {
      user: new ListUserDTO(userCreated.id, userCreated.name),
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
