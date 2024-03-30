import mongoose from 'mongoose';

export class FileDto {
  public _id: mongoose.Types.ObjectId;

  public file: Record<string, any>;
}
