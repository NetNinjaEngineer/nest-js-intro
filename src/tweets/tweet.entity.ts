import { User } from "src/auth/entities/user.entity";
import { Hashtag } from "src/hashtag/hashtag.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tweet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    content: string;


    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @ManyToOne(() => User, (user) => user.tweets)
    user: User

    @ManyToMany(() => Hashtag)
    @JoinTable()
    hashtag: Hashtag

}