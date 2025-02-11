import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsInt()
    userId: number;
}