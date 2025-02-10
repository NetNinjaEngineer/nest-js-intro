import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class GetUserParamDto {
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean) // This is a class-transformer decorator that tells 
    // the class-validator to convert the value to a boolean
    isMarried: boolean;
}