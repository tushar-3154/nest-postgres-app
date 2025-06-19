import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

    private readonly configService: ConfigService,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) { }

  async getAllUsers() {
    try {
      return await this.userRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch (error) {
      console.log('error.code', error.code);
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An Error has occurred . please try again later',
          {
            description: 'Could not connect to databse',
          },
        );
      }
      console.log(error);
    }
  }

  async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile = userDto.profile ?? {};

      const user = this.userRepository.create(userDto);

      return await this.userRepository.save(user);
    } catch (error) {
      console.log('error.code', error.code);
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has occurred. please try again',
          {
            description: 'Could not connect to the database',
          },
        );
      }
      if (error.code === '23505') {
        throw new BadRequestException(
          'There is some duplicate value for the user in Database',
        );
      }
    }
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

  async FindUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
