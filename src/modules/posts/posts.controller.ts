import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { GetResponse } from '../../common/dto/base-response.dto';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('')
  async create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    const newPost = await this.postsService.create(createPostDto.imageId);

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: newPost,
        dataType: PostDto,
        message: 'Create file successfully',
      }),
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const posts = await this.postsService.findAll();

    return res.status(HttpStatus.OK).send(
      GetResponse({
        data: posts,
        dataType: PostDto,
        message: 'Create file successfully',
      }),
    );
  }
}
