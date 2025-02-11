import { BaseEntity } from "src/common/base-entity";
import { Column, CreateDateColumn, Entity, TableInheritance } from "typeorm";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Conversation extends BaseEntity {
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    lastMessageAt?: Date;
}