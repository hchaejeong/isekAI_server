import { Module } from '@nestjs/common';
import { SeriesService } from './services/series.service';
import { SeriesController } from './series.controller';
import { SeriesEntity } from './entities/series.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesRepository } from './repositories/series.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SeriesEntity, SeriesRepository])],
  controllers: [SeriesController],
  providers: [SeriesService, SeriesRepository],
})
export class SeriesModule {}
