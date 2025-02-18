import { Injectable, NotFoundException } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { Hashtag } from "./hashtag.entity";
import { CreateHashtagDto } from "./dtos/create-hashtag.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { existsSync } from "fs";

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

    async deleteHashtag(hashtagId: number) {
        const exitedHashtag = await this.hashTagRepository.findOneBy({ id: hashtagId });
        if (exitedHashtag == null)
            throw new NotFoundException('Hashtag is not founded');

        let updateResult = await this.hashTagRepository.softDelete({ id: hashtagId });
        console.log(updateResult);
        return { isDeleted: true }
    }
}