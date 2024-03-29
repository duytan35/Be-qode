import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './schemas/file.schema';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class FilesService {
  private S3: S3Client;
  private readonly bucketName;

  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
    private readonly postsService: PostsService,
  ) {
    this.S3 = new S3Client({
      region: process.env.S3_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
    });

    this.bucketName = process.env.S3_BUCKET_NAME;
  }

  async create(file: Express.Multer.File) {
    const newFile = new this.fileModel({
      filename: `${uuid()}${extname(file.originalname)}`,
      originalName: file.originalname,
      mimetype: file.mimetype,
    });

    await newFile.save();

    await this.postsService.create(newFile.id);

    await this.S3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: newFile.id,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size,
      }),
    );

    return newFile;
  }
}
