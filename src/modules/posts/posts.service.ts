import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async create(imageId: string) {
    const newPost = new this.postModel({
      imageId,
    });

    await newPost.save();

    return newPost;
  }

  async addComment(postId: string, commentId: string) {
    const newPost = await this.postModel.findByIdAndUpdate(
      postId,
      {
        $push: { comments: commentId },
      },
      { new: true },
    );

    return newPost;
  }

  findAll() {
    const data = this.postModel.find().populate('comments');
    return data;
  }
}
