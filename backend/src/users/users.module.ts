import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [PrismaModule, JwtModule, RedisModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, UsersModule],
})
export class UsersModule {}
