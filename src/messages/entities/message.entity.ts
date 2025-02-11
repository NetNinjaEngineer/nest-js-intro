import { BaseEntity } from "../../common/base-entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { GroupConversation } from "../../conversation/entities/group-conversation.entity";
import { PrivateConversation } from "../../conversation/entities/private-conversation.entity";

@Entity()
export class Message extends BaseEntity {
    @Column({ type: 'uuid', nullable: true })
    privateConversationId?: string;
  
    @ManyToOne(() => PrivateConversation, (conv) => conv.messages, { nullable: true })
    privateConversation?: PrivateConversation;
  
    @Column({ type: 'uuid', nullable: true })
    groupConversationId?: string;
  
    @ManyToOne(() => GroupConversation, (conv) => conv.messages, { nullable: true })
    groupConversation?: GroupConversation;
  
    @Column({ nullable: true })
    content?: string;
  
    @Column({ type: 'timestamptz' })
    createdAt: Date;
  
    @Column({ type: 'timestamptz', nullable: true })
    updatedAt?: Date;
  
    @Column({ type: 'timestamptz', nullable: true })
    readedAt?: Date;
  
    @Column({ default: false })
    isEdited: boolean;
  
    @Column({ default: false })
    isPinned: boolean;
}