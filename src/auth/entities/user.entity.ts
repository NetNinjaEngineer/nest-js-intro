import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profile/profile.entity';
import { Tweet } from 'src/tweets/tweet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile?: Profile;


  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[]
}