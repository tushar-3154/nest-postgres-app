import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile-entity';
import { User } from './user-entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PaginationModule } from '../common/pagination/pagination.module';

@Module({
  imports: [PaginationModule, TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
