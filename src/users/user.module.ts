import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from 'src/profile/profile-entity';
import { PaginationModule } from '../common/pagination/pagination.module';
import { User } from './user-entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PaginationModule,
    TypeOrmModule.forFeature([User, Profile]),
    forwardRef(() => AuthModule),

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
