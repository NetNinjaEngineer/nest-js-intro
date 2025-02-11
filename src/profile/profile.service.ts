import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Profile } from "./profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProfileDto } from "./dto/create-profile.dto";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>) { }


        async createProfile(profileDto: CreateProfileDto ) {
            let profile = this.profileRepository.create(profileDto);
            profile = await this.profileRepository.save(profile);
            return profile;
        }


        async getAllProfiles() {
            return await this.profileRepository.find({
                relations: {
                    user: true
                }
            })
        }

}