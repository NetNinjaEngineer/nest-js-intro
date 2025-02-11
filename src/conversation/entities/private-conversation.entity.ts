import { ChildEntity, Column, OneToMany } from "typeorm";
import { Conversation } from "./common/conversation.entity";
import { Message } from "src/messages/entities/message.entity";

@ChildEntity()
export class PrivateConversation extends Conversation {
    @Column({ type: 'uuid' })
    senderId: string;

    @Column({ type: 'uuid' })
    receiverId: string;

    @OneToMany(() => Message, (message) => message.privateConversation)
    messages: Message[]
}