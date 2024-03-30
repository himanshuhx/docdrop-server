import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS
  const corsOptions: CorsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    exposedHeaders: ['file-name'],
  };
  app.enableCors(corsOptions);

  await app.listen(5000);
}
bootstrap();
