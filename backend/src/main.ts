import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();

  await app.listen(process.env.PORT ?? 3001).then(() => {
    console.log('started on port 3001');
  });
}
bootstrap();
