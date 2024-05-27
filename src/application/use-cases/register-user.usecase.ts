// src/application/use-cases/register-user.usecase.ts
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly logger: ILogger,
  ) {}

  async execute(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    const hashedPassword = await this.bcryptService.hash(password, 10);
    const existingUser = await this.userRepository.findOneByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const user = new User(null, username, email, hashedPassword);

    this.logger.log(
      'RegisterUserUseCase',
      `User ${user.email} registered successfully`,
    );

    await this.userRepository.save(user);
  }
}
