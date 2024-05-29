export interface EventPayloads {
  'user.registered': { email: string };
  'email.verified': { email: string; code: number };
}

export interface IMailingService {
  handleUserRegisteredEvent(payload: EventPayloads['user.registered']): Promise<void>;
  sendVerificationEmail(payload: EventPayloads['email.verified']): Promise<void>;
}
