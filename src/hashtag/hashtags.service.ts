import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Hashtag } from "./hashtag.entity";
import { CreateHashtagDto } from "./dtos/create-hashtag.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class HashtagsService {
    constructor(
        @InjectRepository(Hashtag)
        private readonly hashTagRepository: Repository<Hashtag>) { }
    async createNewHashTag(createHashtagDto: CreateHashtagDto) {
        const hashtag = this.hashTagRepository.create(createHashtagDto);
        return await this.hashTagRepository.save(hashtag);
    }
}