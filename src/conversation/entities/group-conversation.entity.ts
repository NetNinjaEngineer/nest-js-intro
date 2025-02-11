import { ChildEntity, Column, ManyToOne, OneToMany } from "typeorm";
import { Conversation } from "./common/conversation.entity";
import { Group } from "../../group/entities/group.entity";
import { Message } from "../../messages/entities/message.entity";

@ChildEntity()
export class GroupConversation extends Conversation {
    @Column({ type: 'uuid' })
    groupId: string;

    @ManyToOne(() => Group, group => group.groupConversations, { onDelete: 'CASCADE' })
    group: Group;


    @OneToMany(() => Message, (message) => message.groupConversation)
    messages: Message[];
}