import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    await this.registerUserUseCase.execute(body.username, body.password);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const token = await this.authenticateUserUseCase.execute(
      body.username,
      body.password,
    );
    if (!token) {
      return { message: 'Invalid credentials' };
    }
    return { token };
  }
}
