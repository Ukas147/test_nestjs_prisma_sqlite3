import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Heeello World!';
  }

  // Exemplo de lógica de negócio
  getUsers(): string[] {
    return ['João', 'Maria', 'Pedro'];
  }

  createUser(name: string): string {
    return `Usuário ${name} criado com sucesso!`;
  }
}
