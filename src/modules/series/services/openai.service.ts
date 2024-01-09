import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenaiService {
    private readonly openai: OpenAI

    constructor(private readonly configService: ConfigService) {
        const openaiApiKey = this.configService.get('OPENAI_API_KEY');
        if (!openaiApiKey) {
            throw new Error('OPENAI_API_KEY not configured');
        }
        
        this.openai = new OpenAI({
            apiKey: openaiApiKey,
        });
    }

    async getCharacterRelationships(args: { seriesName: string, selectedCharacter: string, remainingCharacters: string[] }): Promise<string> {
        const { seriesName, selectedCharacter, remainingCharacters } = args;
        const prompt = `Provide a detailed summary of the relationships between the selected character ${selectedCharacter} and each of the characters ${remainingCharacters} in ${seriesName}. Present the information in a list format, highlighting key aspects, interactions, and developments in their relationships. Include any significant events or plot points that contribute to the dynamics between the selected character and others. Please generate a comprehensive overview of these relationships based on the context of the ${seriesName}.`;
        
        try {
            const completions = await this.openai.chat.completions.create({
                messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
                model: "gpt-3.5-turbo",
            });

            console.log(completions.choices[0]);
            return completions.choices[0].message.content;
        } catch (error) {
            console.log('Failed to generate character relationships', error.message);
            throw new Error('Failed to generate character relationships');
        }
    }

}
