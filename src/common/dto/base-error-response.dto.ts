import { HttpException } from "@nestjs/common";

export class BaseErrorResponseDto {
    success: boolean;
    message: string;
    statusCode: number;
    timeStamp: string;

    constructor(message: string, statusCode: number) {
        this.success = false;
        this.message = message;
        this.statusCode = statusCode;
        this.timeStamp = new Date().toISOString();
    }

    static fromError(error: Error): BaseErrorResponseDto {
        return new BaseErrorResponseDto(error.message, 500);
    }

    static fromMessage(message: string, statusCode: number): BaseErrorResponseDto {
        return new BaseErrorResponseDto(message, statusCode);
    }

    static fromHttpException(exception: HttpException): BaseErrorResponseDto {
        return new BaseErrorResponseDto(
            exception.message,
            exception.getStatus()
        );
    }
}