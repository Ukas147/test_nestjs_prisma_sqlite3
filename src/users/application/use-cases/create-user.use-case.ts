import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    // Verificar se email já existe
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Criar usuário
    const user = await this.userRepository.create(
      createUserDto.email,
      createUserDto.name,
    );

    return user;
  }
}
