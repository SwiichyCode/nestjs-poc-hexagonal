import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFactory } from '../factory/user.factory';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IMailingService } from '../../domain/adapters/mailing.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { RegisterUserUseCase } from './register-user.usecase';
import { UserCommand } from '../commands/user.command';
import { User } from '../../domain/entities/user.entity';

describe('RegisterUserUsecase', () => {
  let registerUserUsecase: RegisterUserUseCase;
  let userRepository: UserRepository;
  let userFactory: UserFactory;
  let bcryptService: IBcryptService;
  let mailingService: IMailingService;
  let logger: ILogger;

  beforeEach(() => {
    userRepository = {} as jest.Mocked<UserRepository>;
    userFactory = {} as jest.Mocked<UserFactory>;
    bcryptService = {} as jest.Mocked<IBcryptService>;
    mailingService = {} as jest.Mocked<IMailingService>;
    logger = {} as jest.Mocked<ILogger>;

    registerUserUsecase = new RegisterUserUseCase(userRepository, userFactory, bcryptService, mailingService, logger);
  });

  it('should register a new user', async () => {
    const USER_COMMAND_MOCK: UserCommand = {
      username: 'swiichy',
      email: 'adlpromail@gmail.com',
      password: 'password',
      companyId: 0,
    };

    const hashedPassword = 'hashedPassword';
    const createdUser = { ...USER_COMMAND_MOCK, password: hashedPassword } as User;

    userRepository.findOneByEmail = jest.fn().mockResolvedValue(null);
    bcryptService.hash = jest.fn().mockResolvedValue(hashedPassword);
    userFactory.createUser = jest.fn().mockReturnValue(createdUser);
    userRepository.save = jest.fn();
    mailingService.handleUserRegisteredEvent = jest.fn();
    logger.log = jest.fn();

    await registerUserUsecase.execute(USER_COMMAND_MOCK);

    expect(userRepository.findOneByEmail).toHaveBeenCalledWith(USER_COMMAND_MOCK.email);
    expect(bcryptService.hash).toHaveBeenCalledWith(USER_COMMAND_MOCK.password, 10);
    expect(userFactory.createUser).toHaveBeenCalledWith({ ...USER_COMMAND_MOCK, password: hashedPassword });
    expect(userRepository.save).toHaveBeenCalledWith(createdUser);
    expect(mailingService.handleUserRegisteredEvent).toHaveBeenCalledWith({ email: USER_COMMAND_MOCK.email });
    expect(logger.log).toHaveBeenCalledWith('RegisterUserUseCase', `User ${USER_COMMAND_MOCK.email} registered successfully`);
  });

  it('should throw an error if user already exists', async () => {
    const USER_COMMAND_MOCK: UserCommand = {
      username: 'swiichy',
      email: 'adlpromail@gmail.com',
      password: 'password',
      companyId: 0,
    };

    userRepository.findOneByEmail = jest.fn().mockResolvedValue(USER_COMMAND_MOCK);
    logger.log = jest.fn();

    await expect(registerUserUsecase.execute(USER_COMMAND_MOCK)).rejects.toThrow('User already exists');
    expect(logger.log).toHaveBeenCalledWith('RegisterUserUseCase', `User with email ${USER_COMMAND_MOCK.email} already exists`);
  });
});
