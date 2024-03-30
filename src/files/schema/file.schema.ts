import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String })
  name: String;

  @Prop({ type: String })
  mimetype: String;

  @Prop({ type: Buffer }) // Store file data as Buffer
  file: Buffer;
}

export const FileSchema = SchemaFactory.createForClass(File);
