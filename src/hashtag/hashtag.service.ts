import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { Hashtag } from './hashtag-entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async createHashtag(createHashtagDto: CreateHashtagDto) {
    const hashtag = this.hashtagRepository.create(createHashtagDto);

    return await this.hashtagRepository.save(hashtag);
  }

  async findHashtags(hashtags: number[]) {
    return await this.hashtagRepository.find({
      where: { id: In(hashtags) },
    });
  }

  async deleteHashtag(id: number) {
    await this.hashtagRepository.delete({
      id,
    });

    return {
      deleted: true,
      id,
    };
  }

  async softDeleteHashtag(id: number) {
    await this.hashtagRepository.softDelete({ id });

    return {
      deleted: true,
      id,
    };
  }
}
