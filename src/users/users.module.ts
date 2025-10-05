import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserApplicationService } from './application/services/user.application.service';
import { UserRepositoryInterface } from './domain/interfaces/user.domain.interface';
import { UserServiceInterface } from './application/interfaces/user.service.interface';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: UserRepositoryInterface,
      useClass: PrismaUserRepository,
    },
    {
      provide: UserServiceInterface,
      useClass: UserApplicationService,
    },
  ],
  exports: [UserRepositoryInterface, UserServiceInterface],
})
export class UsersModule {}
