import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from './../user.service';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userEmailExists = await this.userService.emailExists(value);
    return !userEmailExists;
  }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
