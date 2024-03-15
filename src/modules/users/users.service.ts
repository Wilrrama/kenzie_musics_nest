import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  private database: User[] = [];
  create(createUserDto: CreateUserDto) {
    const findUser = this.database.find(
      (user) => user.email === createUserDto.email,
    );

    if (findUser) {
      throw new ConflictException('email already exists');
    }

    const user = new User();
    Object.assign(user, {
      ...createUserDto,
    });

    this.database.push(user);
    return plainToInstance(User, user);
  }

  findAll() {
    return this.database;
  }

  findOne(id: string) {
    const user = this.database.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return plainToInstance(User, user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.database.findIndex((user) => user.id === id);
    if (userIndex < 0) {
      throw new NotFoundException('user not found');
    }
    this.database[userIndex] = {
      ...this.database[userIndex],
      ...updateUserDto,
    };
    return plainToInstance(User, this.database[userIndex]);
  }

  remove(id: string) {
    const userIndex = this.database.findIndex((user) => user.id === id);
    if (userIndex < 0) {
      throw new NotFoundException('user not found');
    }
    this.database.splice(userIndex, 1);
  }
}
