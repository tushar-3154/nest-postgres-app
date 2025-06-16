import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { TweetModule } from './tweet/tweet.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // entities: [User, Profile],
      autoLoadEntities: true,
      synchronize: true,
      host: 'localhost',
      logging: true,
      port: 5432,
      username: 'postgres',
      password: 'abcd1234',
      database: 'nestjs',
    }),
    UserModule,
    ProfileModule,
    TweetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
