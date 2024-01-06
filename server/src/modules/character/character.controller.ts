import { Controller } from '@nestjs/common';
import { CharacterService } from './services/character.service';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
}
