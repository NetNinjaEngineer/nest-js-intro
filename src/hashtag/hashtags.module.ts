import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { HashtagsController } from './hashtags.controller';
import { HashtagsService } from './hashtags.service';

@Module({
    controllers: [HashtagsController],
    providers: [HashtagsService],
    imports: [TypeOrmModule.forFeature([Hashtag])],
    exports: [HashtagsService]
})
export class HashtagModule { }
