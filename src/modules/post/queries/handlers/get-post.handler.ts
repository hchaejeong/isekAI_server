import { QueryHandler } from '@nestjs/cqrs';

import { IIQeryHandler } from '@src/utils/cqrs';
import { GetPostQuery } from '../impl/get-post.query';
import { PostRepository } from '../../repositories/post.repository';
import { PostEntity } from '../../entities/post.entity';


@QueryHandler(GetPostQuery)
export class GetPostHandler implements IIQeryHandler<GetPostQuery> {
  constructor(private postRepository: PostRepository) {}

  execute(query: GetPostQuery): Promise<PostEntity | null> {
    const { payload } = query;

    return this.postRepository.findOne(payload);
  }
}
