import { IsNotEmpty, IsString } from "class-validator";

export class GetChatCompletionAnswerInputDto {
    @IsString()
    @IsNotEmpty()
    message: string;
}

export class GetChatCompletionAnswerOutputDto {
    @IsString()
    @IsNotEmpty()
    aiMessage: string;

    static getInstance(aiMessage: string) {
        const result = new GetChatCompletionAnswerOutputDto();
        result.aiMessage = aiMessage;
        return result;
    }
}