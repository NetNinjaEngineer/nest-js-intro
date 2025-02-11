import { IsOptional, IsString } from "class-validator";

export class CreateProfileDto {

    @IsString()
    @IsOptional()
    profileImage?: string;
    
    @IsString()
    @IsOptional()
    bio?: string;

    @IsOptional()
    @IsString()
    country?: string;
}