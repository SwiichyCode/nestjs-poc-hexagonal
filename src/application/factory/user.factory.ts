import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserCommand } from '../commands/user.command';

@Injectable()
export class UserFactory {
  public createUser(userCommand: UserCommand): User {
    return new User(null, userCommand.username, userCommand.email, userCommand.password, userCommand.companyId);
  }
}
