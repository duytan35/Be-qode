import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ versionKey: false, timestamps: true })
export class Comment {
  @Prop({ default: null })
  username: string;

  @Prop({ default: null })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
