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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './src/.env'
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get('DB_TYPE') as any,
                host: configService.get<string>('DB_HOST'),
                port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
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
        HashtagModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
