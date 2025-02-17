import { IsArray, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsOptional()
    @IsInt({ each: true })
    @IsArray()
    hashtags?: number[]
}