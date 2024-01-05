/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { UserEntity } from '../user.entity';

/* Classe Responsável por guardar dados dos novos usuários(users) e lista-los. */

@Injectable()

/* @Injectbale - Decorator responsável por tornar a classe injetável */
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  /* Método save através do parâmetro user adiciona a users */

  async list() {
    return this.users;
  }

  async emailExists(email: string) {
    const possibleUser = this.users.find((usuario) => usuario.email === email);

    return possibleUser !== undefined;
  }
}
