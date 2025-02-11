import { BaseEntity } from "src/common/base-entity";
import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export abstract class Conversation extends BaseEntity {
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    lastMessageAt?: Date;
}