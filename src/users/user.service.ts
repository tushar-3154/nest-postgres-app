import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dto/paginations-query.dto';
import { Paginated } from 'src/common/pagination/paginater.interface';
import { UserAlredyExistsException } from 'src/CustomExceptions/user-already-exists-exceptions';
import { Profile } from 'src/profile/profile-entity';
import { Repository } from 'typeorm';
import { HashingProvider } from '../auth/provider/hashing.provider';
import { PaginationProvider } from '../common/pagination/pagination.provider';
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
    private readonly paginationProvider: PaginationProvider,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) { }

  async getAllUsers(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<Paginated<User>> {
    try {
      return await this.paginationProvider.paginateQuery(
        paginationQueryDto,
        this.userRepository,
        {},
        ['profile'],
      );

      // return await this.userRepository.find({
      //   relations: {
      //     profile: true,
      //   },
      // });
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
      // console.error('Error fetching users:', error);

      // Either throw to satisfy the return type:
      throw error;
    }
  }

  async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile = userDto.profile ?? {};

      const existingUserWithUsername = await this.userRepository.findOne({
        where: [{ username: userDto.username }],
      });
      // console.log('existingUser', existingUser);

      if (existingUserWithUsername) {
        throw new UserAlredyExistsException('username', userDto.username);
      }

      const existingUserWithemail = await this.userRepository.findOne({
        where: [{ email: userDto.email }],
      });

      if (existingUserWithemail) {
        throw new UserAlredyExistsException('email', userDto.email);
      }

      const user = this.userRepository.create({
        ...userDto,
        password: await this.hashingProvider.hashPassword(userDto.password),
      });

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
      // if (error.code === '23505') {
      //   throw new BadRequestException(
      //     'There is some duplicate value for the user in Database',
      //   );
      // }
      console.log(error);
      throw error;
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
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The user with ID ' + id + 'was not found.',
          table: 'user',
        },
        HttpStatus.NOT_FOUND,
        {
          description:
            'The exception occured because a user with ID ' +
            id +
            ' was not found in user table',
        },
      );
    }

    return user;
  }
}
