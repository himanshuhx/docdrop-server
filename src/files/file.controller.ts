import {
  Controller,
  Logger,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly logger: Logger,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.logger.log('uploading file into mongoDB');
    return await this.fileService.upload(file);
  }

  @Get('download/:id')
  async downloadFile(@Param() fileId: string, @Res() response: Response) {
    this.logger.log(`Downloading file with id ${fileId}`);
    const fileData = await this.fileService.downloadFile(fileId);
    const fileName = fileData?.name;
    // convert data coming from mongo from base64 to buffer
    const buffer = Buffer.from(fileData.file as unknown as string, 'base64');
    response.set({
      'content-type': fileData.mimetype,
      'content-disposition': `attachment`,
      'file-name': `${fileName}`,
    });
    response.send(buffer);
  }
}
