/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { mockPrismaService } from '../prisma/prisma.mock';

jest.mock('../prisma/prisma.service');

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedPassword',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw an error if email is already registered', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      await expect(
        service.create({
          name: 'Jane Doe',
          email: 'john@example.com',
          password: 'password123',
        }),
      ).rejects.toThrowError(
        new HttpException(
          'Email is already registered.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  it('should create a new user successfully', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

    const user = await service.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    });

    expect(user).toEqual(mockUser);

    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: expect.stringMatching(/^\$2b\$/),
      },
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([mockUser]);

      const users = await service.findAll();

      expect(users).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const user = await service.findOne(mockUser.email);

      expect(user).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateData = { name: 'Updated Name' };
      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue({ ...mockUser, ...updateData });

      const updatedUser = await service.update(1, updateData);

      expect(updatedUser.name).toBe('Updated Name');
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(mockUser);

      const deletedUser = await service.delete(mockUser.email);

      expect(deletedUser);
    });
  });
});
