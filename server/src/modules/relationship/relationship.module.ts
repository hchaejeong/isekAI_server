import { Module } from '@nestjs/common';
import { RelationshipService } from './services/relationship.service';
import { RelationshipController } from './relationship.controller';

@Module({
  controllers: [RelationshipController],
  providers: [RelationshipService],
})
export class RelationshipModule {}
