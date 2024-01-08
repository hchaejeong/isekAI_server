import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostEntity } from "../entities/post.entity";
import { SeriesEntity } from "@src/modules/series/entities/series.entity";
import { UserEntity } from "@src/modules/user";

@Injectable()
export class PostRepository {
    constructor(@InjectRepository(PostRepository) private repository: Repository<PostEntity>,) {}

    create(args: { title: string, content: string, series: SeriesEntity, user: UserEntity }) {
        const { title, content, series, user } = args;

        return this.repository.create({
            title,
            content,
            likes: 0,
            series,
            user,
        })
    }

    save(...args: Parameters<Repository<PostEntity>['save']>): ReturnType<Repository<PostEntity>['save']> {
        return this.repository.save(...args);
    }

    find(...args: Parameters<Repository<PostEntity>['find']>): ReturnType<Repository<PostEntity>['find']> {
        return this.repository.find(...args);
    }

    findOne(...args: Parameters<Repository<PostEntity>['findOne']>): ReturnType<Repository<PostEntity>['findOne']> {
        return this.repository.findOne(...args);
    }

    update(...args: Parameters<Repository<PostEntity>['update']>): ReturnType<Repository<PostEntity>['update']> {
        return this.repository.update(...args);
    }
}