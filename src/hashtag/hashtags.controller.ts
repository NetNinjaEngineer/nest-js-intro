import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { CreateHashtagDto } from "./dtos/create-hashtag.dto";
import { HashtagsService } from "./hashtags.service";

@Controller('api/hastags')
export class HashtagsController {
    constructor(private readonly hashtagService: HashtagsService) { }

    @Post()
    async createHashtag(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        request: CreateHashtagDto) {
        return await this.hashtagService.createNewHashTag(request);
    }

    @Get()
    async getAll() {
        return await this.hashtagService.getAllHashtags();
    }
}