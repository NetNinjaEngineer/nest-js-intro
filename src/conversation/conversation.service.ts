import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PrivateConversation } from "./entities/private-conversation.entity";
import { Repository } from "typeorm";

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(PrivateConversation)
        private readonly privateConversationRepository: Repository<PrivateConversation>
    ) { }



    async startPrivateConversation() {
        const conversation = this.privateConversationRepository.create({
            id: crypto.randomUUID(),
            senderId: crypto.randomUUID(),
            receiverId: crypto.randomUUID(),
            createdAt: new Date()
        })


        await this.privateConversationRepository.save(conversation);

        return conversation;
    }

}