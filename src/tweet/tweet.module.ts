import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { UserModule } from 'src/users/user.module';
import { TweetController } from './tweet.controller';
import { Tweet } from './tweet.entity';
import { TweetService } from './tweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UserModule, HashtagModule],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
