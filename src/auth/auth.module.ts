import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";
import { Profile } from '../profile/profile.entity';
import { ConfigModule } from "@nestjs/config";
import authConfig from "./config/auth.config";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([User, Profile]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secretKey,
            signOptions: {
                algorithm: "HS256",
                audience: jwtConstants.audience,
                issuer: jwtConstants.issuer,
                expiresIn: jwtConstants.expires
            }
        }),
        ConfigModule.forFeature(authConfig)
    ]
})
export class AuthModule {
}