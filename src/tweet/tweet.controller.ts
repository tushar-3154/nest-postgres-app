import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/pagination/dto/paginations-query.dto';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) { }

  @Get(':userId')
  GetTweets(
    @Param('userId', ParseIntPipe) userid: number,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    console.log(paginationQueryDto);

    return this.tweetService.getTweets(userid, paginationQueryDto);
  }

  @Post()
  CreateTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetService.CreateTweet(tweet);
  }

  @Patch()
  UpdateTweet(@Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetService.updateTweet(updateTweetDto);
  }

  @Delete(':id')
  DeleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.deleteTweet(id);
  }
}
