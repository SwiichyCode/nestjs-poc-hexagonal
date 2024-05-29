import { Controller, Post, Body, Inject, UnauthorizedException } from '@nestjs/common';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.usecase';
import { AuthenticateUserUseCase } from '../../../application/use-cases/authenticate-user.usecase';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUserDto, RegisterUserDto, SendVerificationEmailDto, VerifyEmailCodeDto } from './auth.dto';
import { SendVerificationEmailUsecase } from '../../../application/use-cases/send-verification-email.usecase';
import { VerifyEmailCodeUsecase } from '../../../application/use-cases/verify-email-code.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.REGISTER_USER_USECASES_PROXY)
    private registerUsecaseProxy: UseCaseProxy<RegisterUserUseCase>,
    @Inject(UsecasesProxyModule.AUTHENTICATE_USER_USECASES_PROXY)
    private authenticateUsecaseProxy: UseCaseProxy<AuthenticateUserUseCase>,
    @Inject(UsecasesProxyModule.SEND_VERIFICATION_EMAIL_USECASES_PROXY)
    private sendVerificationEmailUsecaseProxy: UseCaseProxy<SendVerificationEmailUsecase>,
    @Inject(UsecasesProxyModule.VERIFY_EMAIL_CODE_USECASES_PROXY)
    private verifyEmailCodeUsecase: UseCaseProxy<VerifyEmailCodeUsecase>,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.registerUsecaseProxy.getInstance().execute(registerUserDto);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authenticateUsecaseProxy.getInstance().execute(loginUserDto.email, loginUserDto.password);
  }

  @Post('send-verification-email')
  async sendVerificationEmail(@Body() sendVerificationEmailDto: SendVerificationEmailDto) {
    await this.sendVerificationEmailUsecaseProxy.getInstance().execute(sendVerificationEmailDto.email);
    return { message: 'Verification email sent successfully' };
  }

  @Post('verify-email-code')
  async verifyEmailCode(@Body() verifyEmailCodeDto: VerifyEmailCodeDto) {
    await this.verifyEmailCodeUsecase.getInstance().execute(verifyEmailCodeDto.email, verifyEmailCodeDto.code);
    return { message: 'Email verified successfully' };
  }
}
