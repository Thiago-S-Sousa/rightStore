/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUsers(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async listUsers() {
    const savedUsers = await this.userRepository.find();
    const listOfUsers = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.name),
    );

    return listOfUsers;
  }

  async emailExists(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });

    return checkEmail;
  }

  async updateUsers(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUsers(id: string) {
    await this.userRepository.delete(id);
  }
}
