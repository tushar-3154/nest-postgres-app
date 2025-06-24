import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated } from 'src/common/pagination/paginater.interface';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/pagination/dto/paginations-query.dto';
import { PaginationProvider } from '../common/pagination/pagination.provider';
import { HashtagService } from '../hashtag/hashtag.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from './tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private readonly paginationProvider: PaginationProvider,
  ) { }

  async getTweets(
    userId: number,
    pageQueryDto: PaginationQueryDto,
  ): Promise<Paginated<Tweet>> {
    const user = await this.userService.FindUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with userId ${userId} is not found!`);
    }

    return await this.paginationProvider.paginateQuery(
      pageQueryDto,
      this.tweetRepository,
      { user: { id: userId } },
    );
  }

  async CreateTweet(createTweetDto: CreateTweetDto, userId: number) {
    let user: any;
    let hashtags: any;
    try {
      user = await this.userService.FindUserById(userId);

      if (createTweetDto.hashtags) {
        hashtags = await this.hashtagService.findHashtags(
          createTweetDto.hashtags ?? [],
        );
      }
    } catch (error) {
      throw new RequestTimeoutException();
    }
    console.log(createTweetDto.hashtags, hashtags);

    if (createTweetDto.hashtags?.length !== hashtags?.length) {
      throw new BadRequestException();
    }

    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user,
      hashtags,
    });

    try {
      await this.tweetRepository.save(tweet);
    } catch (error) {
      throw new ConflictException(error);
    }

    return tweet;
  }

  async updateTweet(updateTweetDto: UpdateTweetDto) {
    //find all hashtags
    const hashtags = await this.hashtagService.findHashtags(
      updateTweetDto.hashtags ?? [],
    );

    const tweet = await this.tweetRepository.findOne({
      where: { id: updateTweetDto.id },
    });

    // updateTweetDto.text = tweet?.text;

    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }

    tweet.text = updateTweetDto.text ?? tweet.text;
    tweet.image = updateTweetDto.image ?? tweet.image;
    tweet.hashtags = hashtags;

    return await this.tweetRepository.save(tweet);
  }

  async deleteTweet(@Param('id', ParseIntPipe) id: number) {
    await this.tweetRepository.delete({
      id,
    });

    return { deleted: true, id };
  }
}
