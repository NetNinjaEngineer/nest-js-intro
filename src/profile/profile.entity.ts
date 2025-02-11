import { User } from "src/auth/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: true })
    profileImage?: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    bio?: string;

    @Column({ nullable: true })
    country?: string;

    @OneToOne(() => User, (user) => user.profile)
    user: User
}