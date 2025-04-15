/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let authController: AuthController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        createdAt: new Date(),
      };

      const mockUser = { id: 1, ...createUserDto };
      jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);

      const result = await authController.register(createUserDto);

      expect(result).toEqual({ user: mockUser });
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should return a token if login is successful', async () => {
      const loginDto: LoginDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      const mockResponse = {
        name: 'John Doe',
        token: 'jwt-token',
      };

      jest.spyOn(usersService, 'login').mockResolvedValue(mockResponse);

      const result = await authController.login(loginDto);

      expect(result).toEqual(mockResponse);
      expect(usersService.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });

    it('should throw an error if login fails', async () => {
      const loginDto: LoginDto = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };

      jest
        .spyOn(usersService, 'login')
        .mockRejectedValue(new Error('invalid password'));

      await expect(authController.login(loginDto)).rejects.toThrow(
        'invalid password',
      );
      expect(usersService.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });
  });
});
