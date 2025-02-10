import { Controller, forwardRef, Inject } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService) { }
}