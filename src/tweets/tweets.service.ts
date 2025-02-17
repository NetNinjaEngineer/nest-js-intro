import { UsersService } from "src/users/users.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tweet } from "./tweet.entity";
import { CreateTweetDto } from "./dto/create-tweet.dto";
import { AuthService } from "src/auth/auth.service";
import { HashtagsService } from "src/hashtag/hashtags.service";

@Injectable()
export class TweetsService {

    constructor(
        @InjectRepository(Tweet)
        private readonly tweetRepository: Repository<Tweet>,
        private readonly hashtagsService: HashtagsService,
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) { }


    public async createTweet(createTweetDto: CreateTweetDto) {
        // check is there exists a user in database with this user id
        const existedUser = await this.authService.findUserById(createTweetDto.userId);

        if (!existedUser) {
            throw new NotFoundException('There is no exist a user with this id in the database')
        }

        const hashtags = await this.hashtagsService.findHashtags(createTweetDto.hashtags ?? []);

        const createdTweet = this.tweetRepository.create({ ...createTweetDto, user: existedUser, hashtag: hashtags });

        await this.tweetRepository.save(createdTweet);

        return createdTweet;

    }

}