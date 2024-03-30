import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDocDrop(): string {
    return 'Hi From DocDrop!!';
  }
}
