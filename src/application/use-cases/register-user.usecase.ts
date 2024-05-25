// src/application/use-cases/register-user.usecase.ts
import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(username: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(null, username, hashedPassword);
    await this.userRepository.save(user);
  }
}
