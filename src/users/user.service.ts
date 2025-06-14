import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user-entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return this.userRepository.find();
  }

  async createUser(userDto: CreateUserDto) {
    //Validate if a user exist with the given email
    const user = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    //Handle the error / exception
    if (user) {
      return 'The user with the given email already exists!';
    }

    //create that user
    let newUser = this.userRepository.create(userDto);

    newUser = await this.userRepository.save(newUser);

    console.log(newUser);

    return newUser;
  }
}
