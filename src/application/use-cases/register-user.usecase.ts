// src/application/use-cases/register-user.usecase.ts
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IMailingService } from '../../domain/adapters/mailing.interface';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly mailingService: IMailingService,
    private readonly logger: ILogger,
  ) {}

  async execute(username: string, email: string, password: string, companyId?: number): Promise<void> {
    const existingUser = await this.userRepository.findOneByEmail(email);

    if (existingUser) {
      this.logger.log('RegisterUserUseCase', `User with email ${email} already exists`);
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await this.bcryptService.hash(password, 10);
    const user = new User(null, username, email, hashedPassword);

    await this.userRepository.save(user);

    await this.mailingService.handleUserRegisteredEvent({ email: user.email });

    this.logger.log('RegisterUserUseCase', `User ${user.email} registered successfully`);
  }
}
