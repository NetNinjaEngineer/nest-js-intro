import { Body, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { SendGroupMessageDto } from "./dto/send-group-message.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller('api/messages')
export class MessagesController {

    constructor(private readonly messageService: MessagesService) { }

    @UseGuards(AuthGuard)
    @Post('send-group-message')
    async sendGroupMessage(@Body(new ValidationPipe()) command: SendGroupMessageDto) {
        return await this.messageService.sendGroupMessageAsync(command);
    }
}
