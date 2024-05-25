// src/infrastructure/repositories/user.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [];

  async findOneByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }

  async save(user: User): Promise<void> {
    user.id = this.users.length + 1;
    this.users.push(user);
  }
}
