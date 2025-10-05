// Interface para representar dados de usuário sem dependências
export interface UserData {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface para operações de repositório sem dependências
export interface UserRepositoryInterface {
  create(email: string, name: string): Promise<UserData>;
  findById(id: number): Promise<UserData | null>;
  findByEmail(email: string): Promise<UserData | null>;
  findAll(): Promise<UserData[]>;
  update(id: number, email: string, name: string): Promise<UserData>;
  delete(id: number): Promise<void>;
}
