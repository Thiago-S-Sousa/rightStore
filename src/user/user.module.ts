/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { UserRepository } from './user-repository/user-repository';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}
