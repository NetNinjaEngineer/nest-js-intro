import { IsNotEmpty, IsUUID } from "class-validator";

export class SendGroupMessageDto {
    @IsUUID()
    groupId: string;
    @IsNotEmpty({ message: 'Message cannot be empty' })
    message: string;
    @IsUUID()
    conversationId: string;
}