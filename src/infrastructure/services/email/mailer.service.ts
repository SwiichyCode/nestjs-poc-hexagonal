import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { EventPayloads, IMailingService } from '../../../domain/adapters/mailing.interface';

@Injectable()
export class EmailService implements IMailingService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('user.registered')
  async handleUserRegisteredEvent(payload: EventPayloads['user.registered']) {
    await this.mailerService.sendMail({
      to: payload.email,
      subject: 'Welcome to our platform!',
      template: './welcome',
    });
  }

  @OnEvent('email.verified')
  async sendVerificationEmail(payload: EventPayloads['email.verified']): Promise<void> {
    await this.mailerService.sendMail({
      to: payload.email,
      subject: 'Email verification',
      template: './email-verification',
      context: {
        code: payload.code,
      },
    });
  }
}
