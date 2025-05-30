import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from './conversation/conversation.module';
import { GroupModule } from './group/group.module';
import { MessagesModule } from './messages/messages.module';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtags.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'sampledb',
                autoLoadEntities: true,
                synchronize: true
            })
        }),
        UsersModule,
        TweetsModule,
        AuthModule,
        ConversationModule,
        GroupModule,
        MessagesModule,
        ProfileModule,
        HashtagModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './src/.env'
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
