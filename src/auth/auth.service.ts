import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "./dtos/register.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { BaseErrorResponseDto } from "src/common/dto/base-error-response.dto";
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from '../profile/profile.entity';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,

        @Inject(authConfig.KEY) private readonly _authConfig: ConfigType<typeof authConfig>) {

    }


    async register(registerRequest: RegisterDto): Promise<User> {

        console.log(this._authConfig)
        console.log(this._authConfig.sharedSecret)

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


    async deleteUser(id: number) {
        // check is the user existed
        const user = await this.userRepository.findOneBy({ id: id })
        if (!user) {
            throw new NotFoundException('The user is not existed')
        }


        await this.profileRepository.delete(user.profile?.id ?? 0)

        // delete the user profile
        await this.userRepository.delete(id)

        return { isDeleted: true };

    }

    public async findUserById(id: number) {
        return await this.userRepository.findOneBy({ id });
    }

    public async getUserWithTweets(id: number) {

        var existedUser = await this.userRepository.findOneBy({ id });
        if (!existedUser) {
            throw new NotFoundException('User Not Exists')
        }

        return await this.userRepository.findOne({
            where: { id },
            relations: { tweets: true }
        })
    }

}