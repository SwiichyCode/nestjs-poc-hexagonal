import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailingService } from '../../../domain/adapters/mailing.interface';

export interface EventPayloads {
  'user.registered': { email: string };
}

@Injectable()
export class EmailService implements IMailingService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('user.registered')
  async handleUserRegisteredEvent(payload: EventPayloads['user.registered']) {
    console.log('Sending email to:', payload.email);

    await this.mailerService.sendMail({
      to: payload.email,
      subject: 'Welcome to our platform!',
      template: './welcome',
    });
  }
}
