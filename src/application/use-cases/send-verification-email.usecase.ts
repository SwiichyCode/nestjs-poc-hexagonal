import { IMailingService } from '../../domain/adapters/mailing.interface';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';
import { EmailVerificationRepository } from '../../domain/repositories/email-verification.repository';

export class SendVerificationEmailUsecase {
  constructor(
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly userRepository: UserRepository,
    private readonly mailingService: IMailingService,
    private readonly logger: ILogger,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findOneByEmail(email);

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    await this.emailVerificationRepository.createAndSave(email, code);

    await this.mailingService.sendVerificationEmail({ email, code });

    this.logger.log('SendVerificationEmailUsecase', `Verification email sent to ${email}`);
  }
}
