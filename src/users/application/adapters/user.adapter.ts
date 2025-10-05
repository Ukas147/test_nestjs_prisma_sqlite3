import { User } from '../../domain/entities/user.entity';

export class UserAdapter {
  static toDomain(userData: any): User {
    return User.create(
      userData.id,
      userData.email,
      userData.name,
      userData.createdAt,
      userData.updatedAt,
    );
  }

  static toPersistence(user: User): any {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toResponse(user: User): any {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      displayName: user.getDisplayName(),
      initials: user.getInitials(),
      emailDomain: user.getEmailDomain(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
