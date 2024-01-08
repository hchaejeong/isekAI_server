import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature(), UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
