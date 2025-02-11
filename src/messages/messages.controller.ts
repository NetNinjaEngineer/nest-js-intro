import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { SendGroupMessageDto } from "./dto/send-group-message.dto";

@Controller('api/messages')
export class MessagesController {

    constructor(private readonly messageService: MessagesService) { }

    @Post('send-group-message')
    async sendGroupMessage(@Body(new ValidationPipe()) command: SendGroupMessageDto) {
        return await this.messageService.sendGroupMessageAsync(command);
    }
}
