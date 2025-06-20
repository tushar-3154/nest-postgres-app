import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import authConfig from './config/auth.config';
import { BcryptProvider } from './provider/bcrypt.provider';
import { HashingProvider } from './provider/hashing.provider';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
