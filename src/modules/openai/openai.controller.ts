import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './services/openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly aiService: OpenaiService) {}

    @Post()
    public async createMessage(@Body() content: { message: string }) {
        const message = [{ role: 'user', content: content.message }];
        //const finalMsg = await this.aiService.chat(message);

        //return finalMsg;
    }
}
