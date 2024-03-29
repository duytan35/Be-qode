import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Response } from 'express';
import { GetResponse } from '../../common/dto/base-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('')
  async create(@Body() createComment: CreateCommentDto, @Res() res: Response) {
    const newComment = await this.commentsService.create(createComment);

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: newComment,
        dataType: CommentDto,
        message: 'Create comment successfully',
      }),
    );
  }
}
