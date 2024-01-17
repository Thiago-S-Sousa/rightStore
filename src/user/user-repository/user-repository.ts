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

  // Função save - Através do parâmetro user adiciona a users //

  async list() {
    return this.users;
  }

  // ------ Função emailExists ------ //

  async emailExists(email: string) {
    const possibleUser = this.users.find((usuario) => usuario.email === email);

    return possibleUser !== undefined;
  }

  // Função responsável por verificar se um email já está cadastrado ou não //

  // ------ Função searchById ------ //

  private searchById(id: string) {
    const possibleUser = this.users.find((savedUser) => savedUser.id === id);

    if (!possibleUser) {
      throw new Error('Usuário não existe');
    }

    return possibleUser;
  }

  // Função responsável por buscar usuário por id, usado nos Funções update e remove //

  async upadate(id: string, updateData: Partial<UserEntity>) {
    const user = this.searchById(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  // ------ Função remove ------ //

  async remove(id: string) {
    const user = this.searchById(id);

    this.users = this.users.filter((savedUser) => savedUser.id !== id);

    return user;
  }
}
