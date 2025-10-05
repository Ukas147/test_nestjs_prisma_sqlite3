import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Verificar se usuário existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    // Se email foi fornecido, verificar se não está em uso por outro usuário
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findByEmail(updateUserDto.email);
      if (userWithEmail) {
        throw new Error('Email já está em uso');
      }
    }

    // Atualizar usuário
    const user = await this.userRepository.update(
      id,
      updateUserDto.email || existingUser.email,
      updateUserDto.name || existingUser.name,
    );

    return user;
  }
}
