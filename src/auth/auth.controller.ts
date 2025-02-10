import { Body, Controller, forwardRef, Inject, Post, ValidationPipe } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";
import { User } from "./entities/user.entity";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
        private readonly authService: AuthService) { }


    @Post('register')
    async register(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) payload: RegisterDto): Promise<User> {
        return await this.authService.register(payload);
    }

}