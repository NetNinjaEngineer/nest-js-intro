import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseErrorResponseDto } from 'src/common/dto/base-error-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const status = exception.getStatus();
        const errorResponse = exception.getResponse();

        const errorMessage =
            typeof errorResponse === 'string'
                ? errorResponse
                : (errorResponse as any).message || 'Something went wrong';


        console.log(request);

        const baseResponse = new BaseErrorResponseDto(errorMessage, status);

        response.status(status).json(baseResponse);

    }

}