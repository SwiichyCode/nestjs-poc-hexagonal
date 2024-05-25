import { Module } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';

@Module({
  providers: [
    UserService,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
  ],
  exports: [
    UserService,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
