import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await app.listen(process.env.PORT || 8080);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port);
  });
}
bootstrap();
