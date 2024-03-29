import {
  Controller,
  Post,
  UseInterceptors,
  Res,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { GetResponse } from '../../common/dto/base-response.dto';
import { FileDto } from './dto/file.dto';

const maxFileSize = 50 * 1000 * 1000;

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: maxFileSize } }),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const newFile = await this.filesService.create(file);

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: newFile,
        dataType: FileDto,
        message: 'Create file successfully',
      }),
    );
  }
}
