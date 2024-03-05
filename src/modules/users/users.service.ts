import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private database: User[] = [];
  create(createUserDto: CreateUserDto) {
    const user = new User();
    Object.assign(user, {
      ...createUserDto,
    });
    this.database.push(user);
    return user;
  }

  findAll() {
    return this.database;
  }

  findOne(id: string) {
    const user = this.database.find((user) => user.id === id);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.database.findIndex((user) => user.id === id);
    this.database[userIndex] = {
      ...this.database[userIndex],
      ...updateUserDto,
    };
    return this.database[userIndex];
  }

  remove(id: string) {
    const userIndex = this.database.findIndex((user) => user.id === id);
    this.database.splice(userIndex, 1);
  }
}
