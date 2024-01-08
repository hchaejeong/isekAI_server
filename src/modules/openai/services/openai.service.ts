import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class OpenaiService {
    /*
    private readonly openai: OpenAI;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get('OPENAI_API_KEY'),
        });
    }

    async chat(message: any) {
        const chatCompletion = await this.openai.chat.completions.create({
            messages: message,
            model: this.configService.get('OPENAI_API_MODEL'),
        });

        return chatCompletion.choices[0].message.content;
    }
    */


}
