import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/interfaces/user.domain.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserServiceInterface } from '../interfaces/user.service.interface';
import { UserAdapter } from '../adapters/user.adapter';

@Injectable()
export class UserApplicationService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar se email já existe
    const existingUserData = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUserData) {
      throw new Error('Email já está em uso');
    }

    // Criar usuário
    const userData = await this.userRepository.create(
      createUserDto.email,
      createUserDto.name,
    );

    return UserAdapter.toDomain(userData);
  }

  async findById(id: number): Promise<User> {
    const userData = await this.userRepository.findById(id);
    
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }

    return UserAdapter.toDomain(userData);
  }

  async findAll(): Promise<User[]> {
    const usersData = await this.userRepository.findAll();
    return usersData.map(userData => UserAdapter.toDomain(userData));
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Verificar se usuário existe
    const existingUserData = await this.userRepository.findById(id);
    if (!existingUserData) {
      throw new Error('Usuário não encontrado');
    }

    // Se email foi fornecido, verificar se não está em uso por outro usuário
    if (updateUserDto.email && updateUserDto.email !== existingUserData.email) {
      const userWithEmail = await this.userRepository.findByEmail(updateUserDto.email);
      if (userWithEmail) {
        throw new Error('Email já está em uso');
      }
    }

    // Atualizar usuário
    const userData = await this.userRepository.update(
      id,
      updateUserDto.email || existingUserData.email,
      updateUserDto.name || existingUserData.name,
    );

    return UserAdapter.toDomain(userData);
  }

  async delete(id: number): Promise<void> {
    // Verificar se usuário existe
    const existingUserData = await this.userRepository.findById(id);
    if (!existingUserData) {
      throw new Error('Usuário não encontrado');
    }

    // Deletar usuário
    await this.userRepository.delete(id);
  }
}
