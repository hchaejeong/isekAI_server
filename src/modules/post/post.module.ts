import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './post.controller';
import { PostRepository } from './repositories/post.repository';
import { UserModule } from '../user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database';
import { PostEntity } from './entities/post.entity';
import { SeriesModule } from '../series';
import { GetPostHandler } from './queries/handlers/get-post.handler';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostRepository]), CqrsModule, DatabaseModule, UserModule, SeriesModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, GetPostHandler],
  exports: [PostService],
})
export class PostModule {}
