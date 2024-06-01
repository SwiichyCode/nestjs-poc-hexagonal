import { AuthenticateUserUseCase } from './authenticate-user.usecase';
import { ILogger } from '../../domain/logger/logger.interface';
import { IJwtService } from '../../domain/adapters/jwt.interface';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

describe('AuthenticateUserUsecase', () => {
  let authenticateUserUsecase: AuthenticateUserUseCase;
  let userRepository: UserRepository;
  let bcryptService: IBcryptService;
  let jwtService: IJwtService;
  let logger: ILogger;

  beforeEach(() => {
    userRepository = {} as jest.Mocked<UserRepository>;
    bcryptService = {} as jest.Mocked<IBcryptService>;
    jwtService = {} as jest.Mocked<JwtService>;
    logger = {} as jest.Mocked<ILogger>;

    authenticateUserUsecase = new AuthenticateUserUseCase(userRepository, jwtService, bcryptService, logger);
  });

  it('should authenticate a user', async () => {
    const CREDENTIAL_MOCK = {
      email: 'adlpromail@gmail.com',
      password: 'password',
    };

    const PASSWORD_HASHED = 'hashedPassword';

    const user = { id: 1, username: 'swiichy', email: CREDENTIAL_MOCK.email, password: PASSWORD_HASHED };
    const payload = { sub: user.id, username: user.username, email: user.email };

    userRepository.findOneByEmail = jest.fn().mockResolvedValue(user);
    bcryptService.compare = jest.fn().mockResolvedValue(true);
    jwtService.signAsync = jest.fn().mockResolvedValue('token value');
    logger.log = jest.fn();

    const token = await authenticateUserUsecase.execute(CREDENTIAL_MOCK.email, CREDENTIAL_MOCK.password);

    expect(userRepository.findOneByEmail).toHaveBeenCalledWith(CREDENTIAL_MOCK.email);
    expect(bcryptService.compare).toHaveBeenCalledWith(CREDENTIAL_MOCK.password, user.password);
    expect(jwtService.signAsync).toHaveBeenCalledWith(payload);
    expect(logger.log).toHaveBeenCalledWith('AuthenticateUserUseCase', `User ${user.email} authenticated successfully`);
    expect(token).toBe('token value');
  });

  it('should throw an error if user does not exist', async () => {
    const CREDENTIAL_MOCK = {
      email: 'adlpromail@gmail.com',
      password: 'password',
    };

    userRepository.findOneByEmail = jest.fn().mockResolvedValue(null);
    logger.log = jest.fn();

    await expect(authenticateUserUsecase.execute(CREDENTIAL_MOCK.email, CREDENTIAL_MOCK.password)).rejects.toThrowError(
      'Invalid credentials',
    );
    expect(logger.log).toHaveBeenCalledWith('AuthenticateUserUseCase', `User with email ${CREDENTIAL_MOCK.email} not found`);
  });
});
