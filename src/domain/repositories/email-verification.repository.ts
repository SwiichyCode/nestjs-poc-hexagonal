import { EmailVerification } from '../entities/email-verification.entity';

export interface EmailVerificationRepository {
  createAndSave(email: string, code: number): Promise<EmailVerification>;
  findByEmailAndCode(email: string, code: number): Promise<EmailVerification | null>;
  delete(emailVerification: EmailVerification): Promise<void>;
}
