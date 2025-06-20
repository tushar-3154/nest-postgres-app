import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) { }

  isAuthenticated: boolean = false;

  login(email: string, pass: string) {
    console.log(this.authConfiguration);

    return 'User does not exist !';
  }

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
