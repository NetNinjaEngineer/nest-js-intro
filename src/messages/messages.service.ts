import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Repository } from "typeorm";
import { GroupConversation } from "src/conversation/entities/group-conversation.entity";
import { Group } from "../group/entities/group.entity";
import { SendGroupMessageDto } from "./dto/send-group-message.dto";
import { BaseErrorResponseDto } from "src/common/dto/base-error-response.dto";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,

        @InjectRepository(GroupConversation)
        private readonly groupConversationRepository: Repository<GroupConversation>,

        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>

    ) { }


    async sendGroupMessageAsync(command: SendGroupMessageDto) {
        const queryRunner = this.messageRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // check if the group exists

            const existingGroup = this.groupRepository.findOne({ where: { id: command.groupId } });

            if (!existingGroup) {
                throw new HttpException(new BaseErrorResponseDto(
                    `Group with ID ${command.groupId} does not exist`,
                    HttpStatus.NOT_FOUND
                ), HttpStatus.NOT_FOUND)
            }

            const existingConversation = this.groupConversationRepository.findOne({
                where: { id: command.conversationId, groupId: command.groupId }
            })

            if (!existingConversation) {
                throw new HttpException(new BaseErrorResponseDto(
                    `Initialize the group conversation first`,
                    HttpStatus.BAD_REQUEST
                ), HttpStatus.BAD_REQUEST)
            }

            // create message

            const createdMessage = this.messageRepository.create({
                id: crypto.randomUUID(),
                content: command.message,
                isEdited: false,
                isPinned: false,
                groupConversationId: command.conversationId
            })


            await queryRunner.manager.save(Message, createdMessage);
            await queryRunner.commitTransaction();

            return createdMessage.id;

        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

    }
}