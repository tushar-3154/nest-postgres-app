import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get(':userId')
  GetTweets(@Param('userId', ParseIntPipe) userid: number) {
    return this.tweetService.getTweets(userid);
  }

  @Post()
  CreateTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetService.CreateTweet(tweet);
  }
}
