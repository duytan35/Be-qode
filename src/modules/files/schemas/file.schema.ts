import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ versionKey: false, timestamps: true })
export class File {
  @Prop({ default: null })
  filename: string;

  @Prop({ default: null })
  originalName: string;

  @Prop({ default: null })
  mimetype: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
