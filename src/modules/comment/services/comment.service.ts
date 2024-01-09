import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '@src/modules/user/queries/impl/get-user.query';
import { GetPostQuery } from '@src/modules/post/queries/impl/get-post.query';
import { UserEntity } from '@src/modules/user';

@Injectable()
export class CommentService {
    constructor(private commentRepository: CommentRepository, private queryBus: QueryBus) {}

    public async createComment(args: { content: string, postId: string, user: UserEntity }) {
        const { content, postId, user } = args;

        const post = await this.queryBus.execute(
            new GetPostQuery({
                where: {
                id: postId,
                },
            }),
        );
      
        if (!post) {
            throw new UnprocessableEntityException();
        }
    
        if (!user) {
            throw new UnprocessableEntityException();
        }

        const comment = await this.commentRepository.save(
            this.commentRepository.create({
                content,
                post,
                user,
            }),
        );

        return comment;
    }

}
