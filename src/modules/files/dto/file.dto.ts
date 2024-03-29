import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class FileDto {
  @Expose({ name: '_id' })
  @Transform((value) => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'File id' })
  id?: string;

  @ApiProperty({ type: String, description: 'File name' })
  filename: string;

  @ApiProperty({ type: String, description: 'File original name' })
  originalName: string;

  @ApiProperty({ type: String, description: 'Mimetype' })
  mimetype: string;
}
