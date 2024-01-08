import { Module } from '@nestjs/common';
import { CharacterService } from './services/character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterRepository } from './repositories/character.repository';
import { CharacterEntity } from './entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity, CharacterRepository])],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterRepository],
})
export class CharacterModule {}
