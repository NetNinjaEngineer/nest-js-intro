import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "./dtos/register.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { BaseErrorResponseDto } from "src/common/dto/base-error-response.dto";
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from '../profile/profile.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>) {

    }


    async register(registerRequest: RegisterDto): Promise<User> {
        const { email, password, fullName } = registerRequest;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {

            throw new HttpException(
                new BaseErrorResponseDto('the email is already taken', 409),
                HttpStatus.CONFLICT);
        }

        // compute password hash
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({ email, password: passwordHash, fullName });
        this.userRepository.save(user);

        return user;
    }

    async createUser(userDto: CreateUserDto) {

        userDto.profile = userDto.profile ?? {};

        // create profile and save it in profile table
        const profile = this.profileRepository.create(userDto.profile);
        await this.profileRepository.save(profile);


        const existingUser = await this.userRepository.findOne({
            where: { email: userDto.email },
        })

        if (existingUser) {
            throw new ConflictException('The user with the given email is already taken');
        }

        // create the user



        const user = this.userRepository.create(userDto);

        user.profile = profile;

        await this.userRepository.save(user);

        return user;
    }


    async getAllUsers() {
        return await this.userRepository.find({
            relations: {
                profile: true
            }
        })
    }

}