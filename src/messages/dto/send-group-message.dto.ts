import { IsString } from "class-validator";

export class SendGroupMessageDto {
    groupId: string;
    message: string;
    conversationId: string;
}