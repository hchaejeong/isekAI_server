import { Query } from '@src/utils/cqrs';
import { Repository } from 'typeorm';
import { PostEntity } from '../../entities/post.entity';


export class GetPostQuery extends Query<PostEntity | null> {
  constructor(public payload: Parameters<Repository<PostEntity>['findOne']>['0']) {
    super();
  }
}
