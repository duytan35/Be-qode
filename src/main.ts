import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  //app config
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['https://fe-qode.vercel.app', 'http://localhost:3000'],
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization', // Allowed request headers

    preflightContinue: false,
    credentials: true,
  });

  //setup pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
    }),
  );

  //setup swagger
  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('Click Try it out to see the API in action')
    .setVersion('1.0')
    .build();
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      withCredentials: true,
    },
    useGlobalPrefix: true,
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, swaggerOptions);

  await app.listen(port);
  console.log(`Server running on: ${await app.getUrl()}`);
}
bootstrap();
