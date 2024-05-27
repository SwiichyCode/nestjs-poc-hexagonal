// src/application/use-cases/register-user.usecase.ts
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await this.userRepository.findOneByUsername(username);

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const user = new User(null, username, email, hashedPassword);
    await this.userRepository.save(user);
  }
}
