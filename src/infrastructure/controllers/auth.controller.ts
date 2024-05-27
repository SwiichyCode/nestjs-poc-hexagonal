import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.usecase';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../usecases-proxy/usecases-proxy';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_USECASES_PROXY)
    private registerUsecaseProxy: UseCaseProxy<RegisterUserUseCase>,
    @Inject(UsecasesProxyModule.AUTHENTICATE_USECASES_PROXY)
    private authenticateUsecaseProxy: UseCaseProxy<AuthenticateUserUseCase>,
  ) {}

  @Post('register')
  async register(
    @Body() body: { username: string; email: string; password: string },
  ) {
    await this.registerUsecaseProxy
      .getInstance()
      .execute(body.username, body.email, body.password);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const token = await this.authenticateUsecaseProxy
      .getInstance()
      .execute(body.username, body.password);

    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { token };
  }
}
