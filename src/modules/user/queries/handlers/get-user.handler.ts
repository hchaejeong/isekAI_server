import { QueryHandler } from '@nestjs/cqrs';

import { IIQeryHandler } from '@src/utils/cqrs';
import { GetUserQuery } from '../impl/get-user.query';
import { UserRepository } from '../../repository/user.repository';
import { UserEntity } from '../../entities/user.entity';


@QueryHandler(GetUserQuery)
export class GetUserHandler implements IIQeryHandler<GetUserQuery> {
  constructor(private userRepository: UserRepository) {}

  execute(query: GetUserQuery): Promise<UserEntity | null> {
    return this.userRepository.findOne(query.payload);
  }
}
