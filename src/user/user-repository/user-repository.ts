/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { UserEntity } from '../user.entity';

/* Classe Responsável por guardar, listar, editar e excluir os dados dos novos usuários(users). */

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

  async upadate(id: string, updateData: Partial<UserEntity>) {
    const possibleUser = this.users.find((savedUser) => savedUser.id === id);

    if (!possibleUser) {
      throw new Error('Usuário não existe');
    }

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      possibleUser[key] = value;
    });

    return possibleUser;
  }
}
