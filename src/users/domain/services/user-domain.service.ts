import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';

export class UserDomainService {
  // Regra de negócio: verificar se email é único
  static isEmailUnique(user: User, existingUsers: User[]): boolean {
    const userEmail = user.email;
    return !existingUsers.some(existingUser => 
      existingUser.email === userEmail && existingUser.id !== user.id
    );
  }

  // Regra de negócio: verificar se usuário pode ser ativado
  static canActivateUser(user: User): boolean {
    return user.email && user.name && user.id > 0;
  }

  // Regra de negócio: verificar se usuário é de domínio corporativo
  static isCorporateUser(user: User, corporateDomains: string[]): boolean {
    const userDomain = user.getEmailDomain();
    return corporateDomains.includes(userDomain);
  }

  // Regra de negócio: gerar nome de usuário único
  static generateUsername(user: User, existingUsernames: string[]): string {
    const baseUsername = user.name.toLowerCase().replace(/\s+/g, '');
    let username = baseUsername;
    let counter = 1;

    while (existingUsernames.includes(username)) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return username;
  }
}
