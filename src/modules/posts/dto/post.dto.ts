import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { CommentDto } from './comment.dto';

export class PostDto {
  @Expose({ name: '_id' })
  @Transform((value) => value.obj._id.toString())
  @ApiProperty({ type: String })
  id?: string;

  @Transform((value) => value.obj.imageId.toString())
  @ApiProperty({ type: String })
  imageId: string;

  @ApiProperty({ type: [CommentDto] })
  @Type(() => CommentDto)
  comments: CommentDto[];
}
