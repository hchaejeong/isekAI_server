import { Query } from '@src/utils/cqrs';
import { Repository } from 'typeorm';
import { SeriesEntity } from '../../entities/series.entity';


export class GetSeriesQuery extends Query<SeriesEntity | null> {
  constructor(public payload: Parameters<Repository<SeriesEntity>['findOne']>['0']) {
    super();
  }
}
