import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { HashtagService } from '../hashtag/hashtag.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UserService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async getTweets(userId: number) {
    return await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: { user: true },
    });
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
}
