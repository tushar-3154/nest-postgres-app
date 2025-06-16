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
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  async createUser(userDto: CreateUserDto) {
    const user = this.userRepository.create(userDto);

    return await this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    //Find the user with given ID

    // let user: any = await this.userRepository.findOneBy({ id });
    // const user = await this.userRepository.findOne({
    //   where: { id },
    //   relations: ['profile'],
    // });

    //Delete user
    await this.userRepository.delete(id);

    //Delete Profile
    // if (user?.profile?.id) {
    //   await this.profileRepository.delete(user.profile.id);
    // }

    return { deleted: true };
  }
}
