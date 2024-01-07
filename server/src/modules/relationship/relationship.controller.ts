import { Controller } from '@nestjs/common';
import { RelationshipService } from './services/relationship.service';

@Controller('relationship')
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}
}
