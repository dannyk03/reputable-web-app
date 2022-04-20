import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// KHI2ArMWudc0Vr6P

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
