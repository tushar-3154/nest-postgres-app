import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile-entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user-entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getAllUsers() {
    return this.userRepository
      .find
      // {
      //   relations: {
      //     profile: true,
      //   },
      // }
      ();
  }

  async createUser(userDto: CreateUserDto) {
    //Create a Profile & Save

    // userDto.profile = userDto.profile ?? {};
    // const profile = this.profileRepository.create(userDto.profile);

    // await this.profileRepository.save(profile);

    //Create User Object
    const user = this.userRepository.create(userDto);

    //Set the profile
    // user.profile = profile;

    //Save the user object
    return await this.userRepository.save(user);
  }
}
