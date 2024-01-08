import { Query } from '@src/utils/cqrs';
import { UserEntity } from 'server/src/modules/user';
import { Repository } from 'typeorm';

export class GetUserQuery extends Query<UserEntity | null> {
  constructor(public readonly payload: Parameters<Repository<UserEntity>['findOne']>[0]) {
    super();
  }
}
