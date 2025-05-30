import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BaseErrorResponseDto } from "src/common/dto/base-error-response.dto";
import { jwtConstants } from "../auth.constants";

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);

    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            this.logger.warn('No token provided in request');
            throw new UnauthorizedException(new BaseErrorResponseDto(
                'You are not authorized to access this resource',
                HttpStatus.UNAUTHORIZED
            ));
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                audience: jwtConstants.audience,
                issuer: jwtConstants.issuer,
                secret: jwtConstants.secretKey
            });

            request['user'] = payload;
            this.logger.log(`User ${payload.sub} authenticated successfully`);

        } catch (error) {
            this.logger.error('Token verification failed', error.stack);
            throw new UnauthorizedException(new BaseErrorResponseDto(
                'Invalid or expired token',
                HttpStatus.UNAUTHORIZED
            ));
        }

        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            return undefined;
        }

        const [type, token] = authorizationHeader.split(' ');
        return type === 'Bearer' ? token : undefined;

    }
}