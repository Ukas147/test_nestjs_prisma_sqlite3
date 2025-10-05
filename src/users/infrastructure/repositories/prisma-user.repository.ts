import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserRepositoryInterface, UserData } from '../../domain/interfaces/user.domain.interface';

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(email: string, name: string): Promise<UserData> {
    const userData = await this.prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  }

  async findById(id: number): Promise<UserData | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userData) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  }

  async findByEmail(email: string): Promise<UserData | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userData) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  }

  async findAll(): Promise<UserData[]> {
    const usersData = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return usersData.map(userData => ({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    }));
  }

  async update(id: number, email: string, name: string): Promise<UserData> {
    const userData = await this.prisma.user.update({
      where: { id },
      data: {
        email,
        name,
      },
    });

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
