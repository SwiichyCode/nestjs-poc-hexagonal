// src/application/use-cases/register-user.usecase.ts
import { UserRepository } from '../../domain/repositories/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IMailingService } from '../../domain/adapters/mailing.interface';
import { UserCommand } from '../commands/user.command';
import { UserFactory } from '../factory/user.factory';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly bcryptService: IBcryptService,
    private readonly mailingService: IMailingService,
    private readonly logger: ILogger,
  ) {}

  async execute(userCommand: UserCommand): Promise<void> {
    const existingUser = await this.userRepository.findOneByEmail(userCommand.email);

    if (existingUser) {
      this.logger.log('RegisterUserUseCase', `User with email ${userCommand.email} already exists`);
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await this.bcryptService.hash(userCommand.password, 10);
    const user = this.userFactory.createUser({ ...userCommand, password: hashedPassword });

    await this.userRepository.save(user);

    await this.mailingService.handleUserRegisteredEvent({ email: user.email });

    this.logger.log('RegisterUserUseCase', `User ${user.email} registered successfully`);
  }
}
