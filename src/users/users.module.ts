import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserApplicationService } from './application/services/user.application.service';
import { USER_REPOSITORY_TOKEN } from './domain/repositories/user.repository.token';
import { USER_SERVICE_TOKEN } from './application/interfaces/user.service.token';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: PrismaUserRepository,
    },
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserApplicationService,
    },
  ],
  exports: [USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN],
})
export class UsersModule {}
