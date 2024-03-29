import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { File } from '../../files/schemas/file.schema';
import { Comment } from '../../comments/schemas/comment.schema';

export type PostDocument = Post & Document;

@Schema({ versionKey: false, timestamps: true })
export class Post {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: File.name })
  imageId: string;

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: Comment.name })
  comments: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
