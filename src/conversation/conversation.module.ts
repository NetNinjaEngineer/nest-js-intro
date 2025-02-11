import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Conversation } from "./entities/common/conversation.entity";
import { PrivateConversation } from "./entities/private-conversation.entity";
import { GroupConversation } from "./entities/group-conversation.entity";
import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";

@Module({
    imports: [TypeOrmModule.forFeature([
        Conversation,
        PrivateConversation,
        GroupConversation
    ])],
    controllers: [ConversationController],
    providers: [ConversationService]
})
export class ConversationModule {
}