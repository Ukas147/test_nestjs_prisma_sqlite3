import { User } from '../entities/user.entity';

export interface UserRepository {
  create(email: string, name: string): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: number, email: string, name: string): Promise<User>;
  delete(id: number): Promise<void>;
}
