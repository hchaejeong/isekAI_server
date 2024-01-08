import { Body, Controller, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PostService } from './services/post.service';
import { AuthGuard } from '@nestjs/passport';
import { GetAllPostInfoResponseDto } from './dtos/get-all-post-info-response.dto';
import { GetPostResponseDto } from './dtos/get-post-response.dto';
import { CreatePostRequestDto } from './dtos/create-post-request.dto';
import { Request } from 'express';
import { UserEntity } from '../user';
import { CreatePostResponseDto } from './dtos/create-post-response.dto';

@Controller(':seriesId/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/all')
  public async getAllPostInfo(@Param('seriesId') seriesId): Promise<GetAllPostInfoResponseDto> {
    const posts = await this.postService.getAllPosts({ seriesId });
    const titles = posts.map((post) => post.title);
    const likes = posts.map((post) => post.likes);

    return { titles, likes };
  }

  @Get(':postId')
  public async getPost(@Param('seriesId') seriesId, @Param('postId') postId): Promise<GetPostResponseDto> {
    const post = await this.postService.getPost({ seriesId, postId });

    return { post };
  }

  @UseGuards(AuthGuard('google'))
  @Post('/create')
  public async createPost(@Body() body: CreatePostRequestDto, @Param('seriesId') seriesId, @Req() req: Request): Promise<CreatePostResponseDto> {
    const { title, content } = body;
    const user: UserEntity = req.user as UserEntity;

    if (!user) {
      throw new UnauthorizedException();
    }

    const newPost = await this.postService.createPost({ title, content, seriesId, userId: user.id });

    return { title: newPost.title, content: newPost.content, likes: newPost.likes };
  }

  @Patch(':postId/like')
  public async likePost(@Param('seriesId') seriesId, @Param('postId') postId): Promise<GetPostResponseDto> {
    const post = await this.postService.likePost({ seriesId, postId });

    return { post };
  }
}
