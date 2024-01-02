/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { UserRepository } from './user-repository/user-repository';
import { UserController } from './user.controller';
import { EmailIsUniqueValidator } from './validation/email-is-unique.validator';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository, EmailIsUniqueValidator],
})
export class UserModule {}
