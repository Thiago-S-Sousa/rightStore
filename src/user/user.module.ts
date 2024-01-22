/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { EmailIsUniqueValidator } from './validation/email-is-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, EmailIsUniqueValidator],
})
export class UserModule {}
