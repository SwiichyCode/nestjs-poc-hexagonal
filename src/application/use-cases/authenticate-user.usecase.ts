// src/application/use-cases/authenticate-user.usecase.ts
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtTokenService } from '../../infrastructure/services/jwt/jwt.service';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UnauthorizedException } from '@nestjs/common';

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly bcryptService: IBcryptService,
    private readonly logger: ILogger,
  ) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      this.logger.log('AuthenticateUserUseCase', `User with email ${email} not found`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.bcryptService.compare(password, user.password);

    if (!isPasswordValid) {
      this.logger.log('AuthenticateUserUseCase', `Invalid password for user ${user.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username, email: user.email };
    const token = await this.jwtTokenService.signAsync(payload);

    this.logger.log('AuthenticateUserUseCase', `User ${user.email} authenticated successfully`);

    return token;
  }
}
