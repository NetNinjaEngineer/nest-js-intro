import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";

@Controller('api/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Post()
    async createProfile(@Body(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })) profileDto: CreateProfileDto) {
        return this.profileService.createProfile(profileDto);
    }

    @Get()
    async getUserProfiles() {
        return await this.profileService.getAllProfiles();
    }
}