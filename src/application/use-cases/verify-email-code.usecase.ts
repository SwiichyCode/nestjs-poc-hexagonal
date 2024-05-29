import { EmailVerificationRepository } from '../../domain/repositories/email-verification.repository';
import { ILogger } from '../../domain/logger/logger.interface';
import { UnauthorizedException } from '@nestjs/common';

export class VerifyEmailCodeUsecase {
  constructor(
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(email: string, code: number): Promise<void> {
    const emailVerification = await this.emailVerificationRepository.findByEmailAndCode(email, code);

    if (!emailVerification) {
      this.logger.warn('VerifyEmailCodeUseCase', `Invalid verification code for email ${email}`);
      throw new UnauthorizedException('Invalid verification code');
    }

    await this.emailVerificationRepository.delete(emailVerification);

    this.logger.log('VerifyEmailCodeUseCase', `Email ${email} has been verified`);
  }
}
