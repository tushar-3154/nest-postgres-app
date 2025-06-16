import { Body, Controller, Post } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(public readonly hashtagService: HashtagService) {}

  @Post()
  CreateNewHashtag(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.createHashtag(createHashtagDto);
  }
}
