import { QueryHandler } from '@nestjs/cqrs';

import { IIQeryHandler } from '@src/utils/cqrs';
import { GetSeriesQuery } from '../impl/get-series.query';
import { SeriesRepository } from '../../repositories/series.repository';
import { SeriesEntity } from '../../entities/series.entity';

@QueryHandler(GetSeriesQuery)
export class GetSeriesHandler implements IIQeryHandler<GetSeriesQuery> {
  constructor(private seriesRepository: SeriesRepository) {}

  execute(query: GetSeriesQuery): Promise<SeriesEntity | null> {
    const { payload } = query;

    return this.seriesRepository.findOne(payload);
  }
}
