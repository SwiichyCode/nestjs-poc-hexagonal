import { User } from '../entities/user.entity';

export interface UserRepository {
  findOneByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
