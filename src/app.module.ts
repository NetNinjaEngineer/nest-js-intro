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
import databaseConfig from './config/database,config';
import appConfig from './config/app.config';

const environment = process.env.NODE_ENV;
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !environment ? '.env' : `.env.${environment.trim()}`,
            load: [appConfig, databaseConfig]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get('database.type') as any,
                host: configService.get('database.host'),
                port: +configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.name') as any,
                autoLoadEntities: configService.get("database.autoLoadEntities"),
                synchronize: configService.get("database.synchronize")
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
