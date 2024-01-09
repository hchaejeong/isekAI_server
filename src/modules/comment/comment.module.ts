import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { CommentRepository } from './repositories/comment.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, CommentRepository]), UserModule, CqrsModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
