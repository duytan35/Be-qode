import { Comment, CommentDocument } from './schemas/comment.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly postsService: PostsService,
  ) {}

  async create(createComment: CreateCommentDto) {
    const newComment = new this.commentModel({
      username: createComment.username,
      content: createComment.content,
    });

    await newComment.save();

    await this.postsService.addComment(createComment.postId, newComment._id);

    return newComment;
  }
}
