import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Name is required'})
    @MinLength(3, {message: 'Name should be at least 3 characters'})
    @MaxLength(50, {message: 'Name should be at most 50 characters'})
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

    @IsDateString()
    createdAt: Date;

    @IsDateString()
    updatedAt: Date;

    @IsOptional()
    gender?: string;


    @IsOptional()
    age?: number;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsString()
    @IsOptional()
    bio?: string;
}