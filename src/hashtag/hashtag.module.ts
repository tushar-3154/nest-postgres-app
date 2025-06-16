import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './hashtag-entity';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
