import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(username: string, password: string): Promise<void> {
    const user = new User(null, username, password);
    await this.userRepository.save(user);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneByUsername(username);
  }
}
