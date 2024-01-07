import { Injectable } from '@nestjs/common';
import { CharacterRepository } from '../repositories/character.repository';
import { CharacterEntity } from '../entities/character.entity';

@Injectable()
export class CharacterService {
    constructor(private characterRepository: CharacterRepository) {}

    public async getCharacterInfo(args: { characterId: string }): Promise<CharacterEntity> {
        const { characterId } = args;

        const character = await this.characterRepository.findOne({ where: { id: characterId }});

        return character;
    }

}
