export interface EventPayloads {
  'user.registered': { email: string };
}

export interface IMailingService {
  handleUserRegisteredEvent(payload: EventPayloads['user.registered']): Promise<void>;
}
