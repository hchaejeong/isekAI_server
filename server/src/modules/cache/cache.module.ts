import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';

@Module({
  providers: [CacheService],
})
export class CacheModule {}
