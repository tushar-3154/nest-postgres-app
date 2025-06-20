import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import authConfig from './config/auth.config';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly hashingProvider: HashingProvider,
  ) {}

  isAuthenticated: boolean = false;

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByUserName(loginDto.username);

    let isEqual: boolean = false;

    isEqual = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password');
    }
    return {
      data: user,
      success: true,
      message: 'User logged in successfully',
    };
  }

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
