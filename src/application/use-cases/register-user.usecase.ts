import { UserService } from '../../domain/services/user.service';
import * as bcrypt from 'bcryptjs';

export class RegisterUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(username: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.registerUser(username, hashedPassword);
  }
}
