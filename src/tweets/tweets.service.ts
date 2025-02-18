import { UsersService } from "src/users/users.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tweet } from "./tweet.entity";
import { CreateTweetDto } from "./dto/create-tweet.dto";
import { AuthService } from "src/auth/auth.service";
import { HashtagsService } from "src/hashtag/hashtags.service";
import { UpdateTweetDto } from "./dto/update-tweet.dto";

@Injectable()
export class TweetsService {

    constructor(
        @InjectRepository(Tweet)
        private readonly tweetRepository: Repository<Tweet>,
        private readonly hashtagsService: HashtagsService,
        private readonly authService: AuthService
    ) { }

    public async getTweetsForUser(userId: number) {
        return await this.authService.getUserWithTweets(userId);
    }


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

    public async updateTweet(updateTweetDto: UpdateTweetDto) {
        // find al hashtags
        let hashtags = await this.hashtagsService.findHashtags(updateTweetDto.hashtags ?? []);
        // find the tweet

        let tweet = await this.tweetRepository.findOneBy({ id: updateTweetDto.id });

        if (tweet == null)
            throw new NotFoundException('Tweet not founded')

        tweet.content = updateTweetDto.content ?? tweet.content;
        tweet.hashtag = hashtags;


        return await this.tweetRepository.save(tweet);
    }

    public async getSingleTweet(id: number) {
        let existedTweet = await this.tweetRepository.findOneBy({ id: id });
        if (existedTweet == null)
            throw new NotFoundException("Tweet not found");
        return existedTweet;
    }


    public async getTweets(userId: number) {
        return await this.tweetRepository.find({
            where: { user: { id: userId } },
            relations: { user: true, hashtag: true }
        })
    }

    public async deleteExistingTweet(id: number) {
        const existedTweet = await this.tweetRepository.findOneBy({ id });
        if (existedTweet == null)
            throw new NotFoundException('Tweet is not founded');
        const deleteResult = await this.tweetRepository.delete({ id });
        console.log(deleteResult);
        console.log(deleteResult.affected)
        return { isDeleted: true }
    }

}