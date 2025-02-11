import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secretKey,
            signOptions: {
                algorithm: "HS256",
                audience: jwtConstants.audience,
                issuer: jwtConstants.issuer,
                expiresIn: jwtConstants.expires
            }
        })
    ]
})
export class AuthModule {
}