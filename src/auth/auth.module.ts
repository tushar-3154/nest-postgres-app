import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';

@Module({
  imports: [forwardRef(() => UserModule), ConfigModule.forFeature(authConfig)],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
