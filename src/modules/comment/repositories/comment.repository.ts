import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentEntity } from "../entities/comment.entity";
import { PostEntity } from "@src/modules/post/entities/post.entity";
import { UserEntity } from "@src/modules/user";

@Injectable()
export class CommentRepository {
    constructor(@InjectRepository(CommentRepository) private repository: Repository<CommentEntity>,) {}

    create(args: { content: string, post: PostEntity, user: UserEntity }) {
        const { content, post, user } = args;

        return this.repository.create({
            content,
            likes: 0,
            post,
            user,
        })
    }

    save(...args: Parameters<Repository<CommentEntity>['save']>): ReturnType<Repository<CommentEntity>['save']> {
        return this.repository.save(...args);
    }

    find(...args: Parameters<Repository<CommentEntity>['find']>): ReturnType<Repository<CommentEntity>['find']> {
        return this.repository.find(...args);
    }

    findOne(...args: Parameters<Repository<CommentEntity>['findOne']>): ReturnType<Repository<CommentEntity>['findOne']> {
        return this.repository.findOne(...args);
    }

    update(...args: Parameters<Repository<CommentEntity>['update']>): ReturnType<Repository<CommentEntity>['update']> {
        return this.repository.update(...args);
    }
}