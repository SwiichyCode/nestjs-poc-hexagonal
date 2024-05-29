import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { EmailService } from './mailer.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'in-v3.mailjet.com',
        port: Number(587),
        secure: false,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: `"Support" <${process.env.EMAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
