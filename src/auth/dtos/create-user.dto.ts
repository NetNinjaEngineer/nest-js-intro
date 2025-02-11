import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;


  @IsOptional()
  profile?: CreateProfileDto

}