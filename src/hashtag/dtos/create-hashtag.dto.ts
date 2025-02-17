import { IsString } from "class-validator";

export class CreateHashtagDto {
    @IsString()
    text: string;
}