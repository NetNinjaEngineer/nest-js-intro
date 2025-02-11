import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [TweetsController],
    providers: [TweetsService],
    imports: [
        UsersModule,
        AuthModule,
        TypeOrmModule.forFeature([Tweet])
    ]
})
export class TweetsModule { }
