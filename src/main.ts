import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { EnvService } from './config/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(EnvService).read()

  app.enableCors()
  app.use(bodyParser.json())
  app.listen(config.PORT || 3000);
}
bootstrap();