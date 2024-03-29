import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose({ name: '_id' })
  @Transform((value) => value.obj._id.toString())
  @ApiProperty({ type: String })
  id?: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  content: string;
}
