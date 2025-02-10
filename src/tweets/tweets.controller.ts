import { Controller, Get } from "@nestjs/common";
import { Tweet } from "./models/tweet.model";

@Controller('/api/tweets')
export class TweetsController {
    private readonly _tweets: Tweet[] = [
        {
            id: '1',
            text: 'This is a tweet',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            text: 'This is another tweet',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    @Get()
    getAllTweets(): Tweet[] {
        return this._tweets;
    }
}