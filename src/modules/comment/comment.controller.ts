import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CreateCommentRequestDto } from './dtos/create-comment-request.dto';
import { UserEntity } from '../user';
import { Request } from 'express';
import { CreateCommentResponseDto } from './dtos/create-comment-response.dto';

@Controller(':seriesId/post/:postId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  public async createComment(@Param('seriesId') seriesId, @Param('postId') postId, @Req() req: Request, @Body() body: CreateCommentRequestDto): Promise<CreateCommentResponseDto> {
    const { content } = body;
    const user: UserEntity = req.user as UserEntity;

    const newComment = await this.commentService.createComment({
      content,
      postId,
      userId: user.id,
    });

    return { content, likes: newComment.likes };
  }
}
