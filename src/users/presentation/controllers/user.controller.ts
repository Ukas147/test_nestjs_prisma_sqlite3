import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { UserServiceInterface } from '../../application/interfaces/user.service.interface';
import { UserAdapter } from '../../application/adapters/user.adapter';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return UserAdapter.toResponse(user);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map(user => UserAdapter.toResponse(user));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findById(id);
      return UserAdapter.toResponse(user);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return UserAdapter.toResponse(user);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.userService.delete(id);
      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
