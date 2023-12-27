/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

/* Classe Responsável por guardar dados dos novos usuários(users) e lista-los. */

@Injectable()

/* @Injectbale - Decorator responsável por tornar a classe injetável */
export class UserRepository {
  private users = [];

  async save(user: any) {
    this.users.push(user);
  }

  /* Método save através do parâmetro user adiciona a users */

  async list() {
    return this.users;
  }
}
