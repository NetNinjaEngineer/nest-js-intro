import { Body, Controller, Post } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { SendGroupMessageDto } from "./dto/send-group-message.dto";

@Controller('api/messages')
export class MessagesController {

    constructor(private readonly messageService: MessagesService) {}

    @Post('send-group-message')
    sendGroupMessage(@Body() command: SendGroupMessageDto) {
        return this.messageService.sendGroupMessageAsync(command);
    }
}
