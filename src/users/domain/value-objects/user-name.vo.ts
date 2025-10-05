export class UserName {
  private readonly value: string;

  constructor(name: string) {
    if (!this.isValid(name)) {
      throw new Error('Nome deve ter pelo menos 2 caracteres e não pode ser vazio');
    }
    this.value = name.trim();
  }

  private isValid(name: string): boolean {
    return name && name.trim().length >= 2;
  }

  getValue(): string {
    return this.value;
  }

  getInitials(): string {
    const words = this.value.split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words.map(word => word[0]).join('').toUpperCase();
  }

  equals(other: UserName): boolean {
    return this.value === other.value;
  }
}
