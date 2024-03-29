import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class MongoIdDto {
  @IsMongoId()
  @ApiProperty({ type: String, description: 'id' })
  id: string;
}
