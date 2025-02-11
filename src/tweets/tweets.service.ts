import { UsersService } from "src/users/users.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tweet } from "./tweet.entity";
import { CreateTweetDto } from "./dto/create-tweet.dto";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class TweetsService {

    constructor(
        private readonly userService: UsersService,
        @InjectRepository(Tweet) private readonly tweetRepository: Repository<Tweet>,
        private readonly authService: AuthService) { }


    public async createTweet(createTweetDto: CreateTweetDto) {
        // check is there exists a user in database with this user id
        const existedUser = await this.authService.findUserById(createTweetDto.userId);

        if (!existedUser) {
            throw new NotFoundException('There is no exist a user with this id in the database')
        }

        const createdTweet = this.tweetRepository.create(createTweetDto);
        createdTweet.user = existedUser;
        await this.tweetRepository.save(createdTweet);

        return createdTweet;

    }

}