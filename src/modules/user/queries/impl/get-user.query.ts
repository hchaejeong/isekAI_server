import { Query } from '@src/utils/cqrs';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

export class GetUserQuery extends Query<UserEntity | null> {
  constructor(public readonly payload: Parameters<Repository<UserEntity>['findOne']>[0]) {
    super();
  }
}
