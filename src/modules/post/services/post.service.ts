import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostEntity } from '../entities/post.entity';
import { TransactionService } from '@src/modules/database';
import { UserRepository } from '@src/modules/user';
import { QueryBus } from '@nestjs/cqrs';
import { GetSeriesQuery } from '@src/modules/series/queries/impl/get-series.query';
import { GetUserQuery } from '@src/modules/user/queries/impl/get-user.query';

@Injectable()
export class PostService {
    constructor(private postRepository: PostRepository, private queryBus: QueryBus) {}

    public async getAllPosts(args: { seriesId: string }): Promise<PostEntity[]> {
        const { seriesId } = args;

        const posts = await this.postRepository.find({
            where: {
                seriesId,
            },
        });

        if (!posts) {
            throw new UnauthorizedException();
        }

        return posts;
    }

    public async getPost(args: { seriesId: string, postId: string }): Promise<PostEntity> {
        const { seriesId, postId } = args;

        const post = await this.postRepository.findOne({
            where: {
                id: postId,
                seriesId,
            },
        });

        if (!post) {
            throw new UnauthorizedException();
        }

        return post;
    }

    public async likePost(args: { seriesId: string, postId: string }): Promise<PostEntity> {
        const { seriesId, postId } = args;

        const selected = await this.postRepository.findOne({
            where: {
                id: postId,
                seriesId,
            },
        });

        const currentLikes = selected.likes;

        const post = await this.postRepository.update({ id: postId, seriesId }, { likes: (currentLikes + 1) });

        const finalPost = await this.postRepository.findOne({
            where: {
              id: postId,
              seriesId,
            },
        });
    
        if (!finalPost) {
        throw new UnprocessableEntityException();
        }
    
        return finalPost;
    }

    public async createPost(args: { title: string, content: string, seriesId: string, userId: string }): Promise<PostEntity> {
        const { title, content, seriesId, userId } = args;

        const series = await this.queryBus.execute(
            new GetSeriesQuery({
              where: {
                id: seriesId,
            },
        }),
        );
      
        if (!series) {
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

        const post = await this.postRepository.create({
            title,
            content,
            series,
            user,
        });

        return post;
    }
}
