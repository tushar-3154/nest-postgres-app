import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import authConfig from '../config/auth.config';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private readonly jweService: JwtService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = await this.jweService.verifyAsync(token, {
        secret: this.authConfiguration.secret,
      });

      request['user'] = payload;
      console.log('JWT Payload:', payload);
    } catch (error) {
      console.error('JWT Verification Failed:', error);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
