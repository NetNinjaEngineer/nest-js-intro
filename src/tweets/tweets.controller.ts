import { Body, Controller, Post, Query } from "@nestjs/common";
import { TweetsService } from "./tweets.service";
import { CreateTweetDto } from "./dto/create-tweet.dto";

@Controller('/api/tweets')
export class TweetsController {

    constructor(private readonly _tweetsService: TweetsService) { }

    // DefaultValuePipe => a built-in pipe that provides a default value for a parameter if it is not provided
    //  in the request. This is useful for setting default values for optional query parameters
    //  or route parameters.
    // @Get()
    // getAllTweets(
    //     @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    //     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number): Tweet[] {
    //     return this._tweetsService.getAllTweets();
    // }

    // s a built-in pipe that is used to transform and validate route parameters.
    // Specifically, it converts a string parameter to an integer. 
    // If the transformation fails (i.e., the parameter cannot be converted to an integer),
    //  it throws an error.
    // @Get(':id')
    // getTweetById(@Param('id', ParseIntPipe) id: number): Tweet | undefined {
    //     console.log(typeof id, id);
    //     return this._tweetsService.getTweetById(id);
    // }


    // @Get('/v2/:userId')
    // getTweetsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    //     return this._tweetsService.getTweetsByUserId(userId);
    // }

    @Post()
    public async create(@Body() createTweetDto: CreateTweetDto) {
        return await this._tweetsService.createTweet(createTweetDto);
    }
}