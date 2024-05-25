import { UserService } from '../../domain/services/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export class AuthenticateUserUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(username: string, password: string): Promise<string | null> {
    const user = await this.userService.findUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.jwtService.sign({ username: user.username, sub: user.id });
    }
    return null;
  }
}
