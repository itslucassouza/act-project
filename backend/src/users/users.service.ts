/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('users')
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email is already registered.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.hashPassword(data.password);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    await this.cacheManager.del('users_all');

    return user;
  }

  async findAll() {
    const cachedUsers = await this.cacheManager.get('users_all');
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.prisma.user.findMany();
    await this.cacheManager.set('users_all', users, 600);
    return users;
  }

  async findOne(email: string) {
    // Adicione validação para o parâmetro email
    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }

    const cacheKey = `user_${email}`;
    const cachedUser = await this.cacheManager.get(cacheKey);

    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      await this.cacheManager.set(cacheKey, user, 600);
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    await this.cacheManager.del(`user_${updatedUser.email}`);
    await this.cacheManager.del('users_all');

    return updatedUser;
  }

  async delete(email: string) {
    const user = await this.prisma.user.delete({ where: { email } });

    await this.cacheManager.del(`user_${user.email}`);
    await this.cacheManager.del('users_all');

    return { message: 'User deleted successfully' };
  }

  async testCache() {
    await this.cacheManager.set('test_key', { message: 'Hello Redis!' }, 60);

    const cachedValue = await this.cacheManager.get('test_key');
    console.log('Valor do cache:', cachedValue);

    await this.cacheManager.del('test_key');
    const deletedValue = await this.cacheManager.get('test_key');
    console.log('Valor após deleção:', deletedValue);

    return {
      set: 'OK',
      get: cachedValue,
      del: deletedValue === null ? 'Success' : 'Failed',
    };
  }
}
