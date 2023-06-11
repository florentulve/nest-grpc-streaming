import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ItemModule,
    GrpcReflectionModule.register({
      transport: Transport.GRPC,
      options: {
        package: 'item',
        protoPath: join(__dirname, 'item/item.proto'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
