import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from './schema/file.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  async upload(file: Express.Multer.File) {
    const newFile = new this.fileModel({
      name: file.originalname || 'no_name',
      mimetype: file.mimetype,
      file: file.buffer,
    });
    return await newFile.save();
  }

  async getFileById(fileId: string) {
    const id = new ObjectId(fileId);
    return await this.fileModel.findOne({ _id: id });
  }
}
