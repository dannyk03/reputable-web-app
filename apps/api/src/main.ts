import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mongoose } from '@typegoose/typegoose';
// KHI2ArMWudc0Vr6P

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4000);
  mongoose.set('debug', true);
}
bootstrap();
