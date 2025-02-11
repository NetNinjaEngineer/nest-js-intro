import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Group } from "../group/entities/group.entity";
import { GroupConversation } from "../conversation/entities/group-conversation.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Message, GroupConversation, Group])],
    controllers: [MessagesController],
    providers: [MessagesService]
})
export class MessagesModule {
}