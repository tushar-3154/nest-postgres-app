import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import authConfig from './config/auth.config';
import { BcryptProvider } from './provider/bcrypt.provider';
import { HashingProvider } from './provider/hashing.provider';

@Module({
  imports: [UserModule, ConfigModule.forFeature(authConfig)],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
