import { Email } from '../value-objects/email.vo';
import { UserName } from '../value-objects/user-name.vo';

export class User {
  private constructor(
    private readonly _id: number,
    private readonly _email: Email,
    private readonly _name: UserName,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {}

  // Factory method para criar usuário
  static create(
    id: number,
    email: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  ): User {
    const emailVO = new Email(email);
    const nameVO = new UserName(name);

    return new User(id, emailVO, nameVO, createdAt, updatedAt);
  }

  // Getters (propriedades readonly)
  get id(): number {
    return this._id;
  }

  get email(): string {
    return this._email.getValue();
  }

  get name(): string {
    return this._name.getValue();
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Métodos de domínio
  getEmailDomain(): string {
    return this._email.getDomain();
  }

  getInitials(): string {
    return this._name.getInitials();
  }

  getDisplayName(): string {
    return `${this._name.getValue()} (${this._email.getValue()})`;
  }

  isEmailFromDomain(domain: string): boolean {
    return this._email.getDomain() === domain;
  }

  // Método para atualizar nome (mantém imutabilidade)
  updateName(newName: string): User {
    const newNameVO = new UserName(newName);
    return new User(
      this._id,
      this._email,
      newNameVO,
      this._createdAt,
      new Date(), // updatedAt
    );
  }

  // Método para atualizar email (mantém imutabilidade)
  updateEmail(newEmail: string): User {
    const newEmailVO = new Email(newEmail);
    return new User(
      this._id,
      newEmailVO,
      this._name,
      this._createdAt,
      new Date(), // updatedAt
    );
  }
}
