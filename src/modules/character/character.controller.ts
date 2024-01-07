import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common';
import { CharacterService } from './services/character.service';
import { GetMeResponseDto } from './dtos/get-me-response.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get('/:characterId')
  public async getMe(@Param('characterId') characterId: string): Promise<GetMeResponseDto> {
    const character = await this.characterService.getCharacterInfo({ characterId });

    if (!character) {
      throw new UnauthorizedException();
    }

    return {character};
  }

}
