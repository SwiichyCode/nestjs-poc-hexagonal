import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.usecase';
import { JwtService } from '@nestjs/jwt';

const mockJwtService = {
  sign: jest.fn(),
};

const mockRegisterUserUseCase = {
  execute: jest.fn(),
};

const mockAuthenticateUserUseCase = {
  execute: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let registerUserUseCase: RegisterUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: RegisterUserUseCase, useValue: mockRegisterUserUseCase },
        {
          provide: AuthenticateUserUseCase,
          useValue: mockAuthenticateUserUseCase,
        },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    authenticateUserUseCase = module.get<AuthenticateUserUseCase>(
      AuthenticateUserUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should call registerUserUseCase.execute', async () => {
      const registerSpy = jest.spyOn(registerUserUseCase, 'execute');
      await authController.register({
        username: 'username',
        password: 'password',
      });
      expect(registerSpy).toHaveBeenCalledWith('username', 'password');
    });

    it('should return { message: "User registered successfully" }', async () => {
      jest.spyOn(registerUserUseCase, 'execute').mockResolvedValue(undefined);
      expect(
        await authController.register({
          username: 'username',
          password: 'password',
        }),
      ).toEqual({ message: 'User' + ' registered successfully' });
    });
  });

  describe('login', () => {
    it('should call authenticateUserUseCase.execute', async () => {
      const authenticateSpy = jest.spyOn(authenticateUserUseCase, 'execute');
      await authController.login({
        username: 'username',
        password: 'password',
      });
      expect(authenticateSpy).toHaveBeenCalledWith('username', 'password');
    });

    it('should return { token } when authentication is successful', async () => {
      jest.spyOn(authenticateUserUseCase, 'execute').mockResolvedValue('token');
      expect(
        await authController.login({
          username: 'username',
          password: 'password',
        }),
      ).toEqual({ token: 'token' });
    });

    it('should return { message: "Invalid credentials" } when authentication fails', async () => {
      jest.spyOn(authenticateUserUseCase, 'execute').mockResolvedValue(null);
      expect(
        await authController.login({
          username: 'username',
          password: 'password',
        }),
      ).toEqual({ message: 'Invalid credentials' });
    });
  });
});
