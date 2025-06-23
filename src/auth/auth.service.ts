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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,
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

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: this.authConfiguration.expireIn,
        audience: this.authConfiguration.audiance,
      },
    );

    return {
      token: token,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
