import { UserRepository } from '../../domain/repositories/user.repository';
import { UserFactory } from '../factory/user.factory';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IMailingService } from '../../domain/adapters/mailing.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { RegisterUserUseCase } from './register-user.usecase';

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
    const userCommand = {
      username: 'swiichy',
      email: 'adlpromail@gmail.com',
      password: 'password',
      companyId: 0,
    };

    const hashedPassword = 'hashedPassword';

    userRepository.findOneByEmail = jest.fn().mockResolvedValue(null);
    bcryptService.hash = jest.fn().mockResolvedValue(hashedPassword);
    userFactory.createUser = jest.fn().mockReturnValue(userCommand);
    userRepository.save = jest.fn();
    mailingService.handleUserRegisteredEvent = jest.fn();
    logger.log = jest.fn();

    await registerUserUsecase.execute(userCommand);

    expect(userRepository.findOneByEmail).toHaveBeenCalledWith(userCommand.email);
    expect(bcryptService.hash).toHaveBeenCalledWith(userCommand.password, 10);
    expect(userFactory.createUser).toHaveBeenCalledWith({ ...userCommand, password: hashedPassword });
    expect(userRepository.save).toHaveBeenCalledWith(userCommand);
    expect(mailingService.handleUserRegisteredEvent).toHaveBeenCalledWith({ email: userCommand.email });
    expect(logger.log).toHaveBeenCalledWith('RegisterUserUseCase', `User ${userCommand.email} registered successfully`);
  });

  it('should throw an error if user already exists', async () => {
    const userCommand = {
      username: 'swiichy',
      email: 'adlpromail@gmail.com',
      password: 'password',
      companyId: 0,
    };

    userRepository.findOneByEmail = jest.fn().mockResolvedValue(userCommand);
    logger.log = jest.fn();

    await expect(registerUserUsecase.execute(userCommand)).rejects.toThrow('User already exists');
    expect(logger.log).toHaveBeenCalledWith('RegisterUserUseCase', `User with email ${userCommand.email} already exists`);
  });
});
