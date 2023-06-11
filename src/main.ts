import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  /*const app = await NestFactory.create(AppModule);
  await app.listen(3000);*/

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    addReflectionToGrpcConfig({
      transport: Transport.GRPC,
      options: {
        package: 'item',
        protoPath: join(__dirname, 'item/item.proto'),
      },
    }),
  );
  await app.listen();
}
bootstrap();
