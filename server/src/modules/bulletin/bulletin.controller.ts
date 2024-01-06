import { Controller } from '@nestjs/common';
import { BulletinService } from './services/bulletin.service';

@Controller('bulletin')
export class BulletinController {
  constructor(private readonly bulletinService: BulletinService) {}
}
