import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(public readonly hashtagService: HashtagService) {}

  @Post()
  CreateNewHashtag(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.createHashtag(createHashtagDto);
  }

  @Delete(':id')
  DeleteHashTag(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.deleteHashtag(id);
  }

  @Delete('soft-delete/:id')
  SoftDeleteHashtag(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.softDeleteHashtag(id);
  }
}
