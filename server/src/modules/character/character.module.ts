import { Module } from '@nestjs/common';
import { CharacterService } from './services/character.service';
import { CharacterController } from './character.controller';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
