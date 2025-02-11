import { Column, CreateDateColumn, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/base-entity";
import { create } from "domain";
import { GroupConversation } from "src/conversation/entities/group-conversation.entity";
import { group } from "console";

@Entity()
export class Group extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ nullable: true })
    pictureName?: string;

    @Column()
    createdByUserId: string;

    @OneToMany(() => GroupConversation, (groupConversation) => groupConversation.group)
    groupConversations: GroupConversation[]
}