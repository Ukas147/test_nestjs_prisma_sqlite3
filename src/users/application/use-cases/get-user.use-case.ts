import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }
}
