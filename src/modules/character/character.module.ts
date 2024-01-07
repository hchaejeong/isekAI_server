import { Module } from '@nestjs/common';
import { CharacterService } from './services/character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterRepository } from './repositories/character.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterRepository])],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterRepository],
})
export class CharacterModule {}
