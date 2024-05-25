// src/application/use-cases/authenticate-user.usecase.ts
import { UserRepository } from '../../domain/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(username: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.jwtService.sign({ username: user.username, sub: user.id });
    }
    return null;
  }
}
