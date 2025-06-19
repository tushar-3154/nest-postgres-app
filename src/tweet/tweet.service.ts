import {
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/pagination/dto/paginations-query.dto';
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
  ) { }

  async getTweets(userId: number, pageQueryDto: PaginationQueryDto) {
    const user = await this.userService.FindUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with userId ${userId} is not found!`);
    }

    return await this.tweetRepository.find(
      {
        where: { user: { id: userId } },
        relations: { user: true, hashtags: true },
        skip: (pageQueryDto.page - 1) * pageQueryDto.limit,
        take: pageQueryDto.limit,
      },
      //
    );
  }

  async CreateTweet(createTweetDto: CreateTweetDto) {
    const user = await this.userService.FindUserById(createTweetDto.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createTweetDto.userId} not found`,
      );
    }

    const hashtags = await this.hashtagService.findHashtags(
      createTweetDto.hashtags ?? [],
    );

    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user,
      hashtags,
    });

    await this.tweetRepository.save(tweet);

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
