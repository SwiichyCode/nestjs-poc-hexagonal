import { Injectable } from '@nestjs/common';
import { EmailVerificationRepository } from '../../domain/repositories/email-verification.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerification } from '../entities/email-verification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailVerificationRepositoryImpl implements EmailVerificationRepository {
  constructor(@InjectRepository(EmailVerification) private emailVerificationRepository: Repository<EmailVerification>) {}

  async createAndSave(email: string, code: number): Promise<EmailVerification> {
    const emailVerification = this.emailVerificationRepository.create({ email, code });
    await this.emailVerificationRepository.save(emailVerification);

    return emailVerification;
  }

  async findByEmailAndCode(email: string, code: number): Promise<EmailVerification | null> {
    const emailVerification = await this.emailVerificationRepository.findOne({ where: { email, code } });
    return emailVerification || null;
  }
}
