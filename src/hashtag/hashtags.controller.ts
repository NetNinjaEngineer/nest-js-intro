import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, ValidationPipe } from "@nestjs/common";
import { CreateHashtagDto } from "./dtos/create-hashtag.dto";
import { HashtagsService } from "./hashtags.service";

@Controller('api/hashtags')
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

    @Delete(':id')
    public async deleteHashtag(@Param('id', ParseIntPipe) id: number) {
        return await this.hashtagService.deleteHashtag(id);
    }
}