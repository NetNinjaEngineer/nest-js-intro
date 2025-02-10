import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "./dtos/register.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { BaseErrorResponseDto } from "src/common/dto/base-error-response.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }


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

}