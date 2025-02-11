import { Body, Controller, Get, Post } from "@nestjs/common";
import { ConversationService } from "./conversation.service";

@Controller('/api/conversations')
export class ConversationController {

    constructor(
        private readonly conversationService: ConversationService
    ) { }

    @Post()
    async startPrivateConversation(@Body() request: any) {
        return await this.conversationService.startPrivateConversation();
    }
}