import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { ConversationModule } from './conversation/conversation.module';
import { GroupModule } from './group/group.module';
import { MessagesModule } from './messages/messages.module';
import { Group } from './group/entities/group.entity';
import { GroupConversation } from './conversation/entities/group-conversation.entity';
import { PrivateConversation } from './conversation/entities/private-conversation.entity';
import { Message } from './messages/entities/message.entity';
import { Conversation } from './conversation/entities/common/conversation.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'learn_nest',
                entities: [
                    User,
                    Group,
                    GroupConversation,
                    PrivateConversation,
                    Message,
                    Conversation
                ],
                synchronize: true
            })
        }),
        UsersModule,
        TweetsModule,
        AuthModule,
        ConversationModule,
        GroupModule,
        MessagesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
