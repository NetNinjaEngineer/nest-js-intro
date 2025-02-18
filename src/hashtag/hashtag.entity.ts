import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hashtag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        type: 'text',
        unique: true
    })
    text: string

    @DeleteDateColumn()
    deletedAt: Date
}