import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FileRepository } from './file.repository';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async upload(file: Express.Multer.File) {
    try {
      this.logger.log('Uploading new File');
      const uploadedFile = await this.fileRepository.upload(file);
      const fileId = uploadedFile._id;
      return fileId;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `Failed to upload file with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async downloadFile(fileId: string) {
    try {
      this.logger.log(`Downloading File with ${fileId}`);
      const fileDetails = await this.fileRepository.getFileById(fileId);

      if (!fileDetails) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to retrieve File, no File found with id:${fileId}`,
        });
      }
      return fileDetails;
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          message: err.message,
        },
        err.status,
      );
    }
  }
}
