import { Controller, Post, Body, Inject, UnauthorizedException } from '@nestjs/common';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.usecase';
import { AuthenticateUserUseCase } from '../../../application/use-cases/authenticate-user.usecase';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUserDto, RegisterUserDto, SendVerificationEmailDto } from './auth.dto';
import { SendVerificationEmailUsecase } from '../../../application/use-cases/send-verification-email.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_USER_USECASES_PROXY)
    private registerUsecaseProxy: UseCaseProxy<RegisterUserUseCase>,
    @Inject(UsecasesProxyModule.AUTHENTICATE_USER_USECASES_PROXY)
    private authenticateUsecaseProxy: UseCaseProxy<AuthenticateUserUseCase>,
    @Inject(UsecasesProxyModule.SEND_VERIFICATION_EMAIL_USECASES_PROXY)
    private sendVerificationEmailUsecaseProxy: UseCaseProxy<SendVerificationEmailUsecase>,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.registerUsecaseProxy.getInstance().execute(registerUserDto);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const token = await this.authenticateUsecaseProxy.getInstance().execute(email, password);

    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { token };
  }

  @Post('send-verification-email')
  async sendVerificationEmail(@Body() sendVerificationEmailDto: SendVerificationEmailDto) {
    await this.sendVerificationEmailUsecaseProxy.getInstance().execute(sendVerificationEmailDto.email);
    return { message: 'Verification email sent successfully' };
  }
}
