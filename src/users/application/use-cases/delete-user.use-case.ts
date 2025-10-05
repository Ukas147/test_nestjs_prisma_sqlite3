import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    // Verificar se usuário existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    // Deletar usuário
    await this.userRepository.delete(id);
  }
}
