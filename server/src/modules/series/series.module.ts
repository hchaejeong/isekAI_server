import { Module } from '@nestjs/common';
import { SeriesService } from './services/series.service';
import { SeriesController } from './series.controller';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
