import { Injectable } from "@nestjs/common";
import { In, Repository } from "typeorm";
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


    async findHashtags(hashtags: number[]) {
        return await this.hashTagRepository.find({
            where: { id: In(hashtags) }
        })
    }

    async getAllHashtags() {
        return await this.hashTagRepository.find();
    }
}