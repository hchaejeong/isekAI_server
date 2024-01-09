import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '@src/modules/user/queries/impl/get-user.query';
import { GetPostQuery } from '@src/modules/post/queries/impl/get-post.query';

@Injectable()
export class CommentService {
    constructor(private commentRepository: CommentRepository, private queryBus: QueryBus) {}

    public async createComment(args: { content: string, postId: string, userId: string }) {
        const { content, postId, userId } = args;

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
    
        const user = await this.queryBus.execute(
            new GetUserQuery({
                where: {
                    id: userId,
                },
            }),
        );
    
        if (!user) {
            throw new UnprocessableEntityException();
        }

        const comment = await this.commentRepository.create({
            content,
            post,
            user,
        });

        return comment;
    }

}
