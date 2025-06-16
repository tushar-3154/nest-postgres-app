import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/users/user.module';
import { TweetController } from './tweet.controller';
import { Tweet } from './tweet.entity';
import { TweetService } from './tweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UserModule],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
