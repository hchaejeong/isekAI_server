import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './post.controller';
import { PostRepository } from './repositories/post.repository';
import { UserModule } from '../user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), CqrsModule, DatabaseModule, UserModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
