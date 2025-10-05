import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface UserServiceInterface {
  create(createUserDto: CreateUserDto): Promise<User>;
  findById(id: number): Promise<User>;
  findAll(): Promise<User[]>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  delete(id: number): Promise<void>;
}
