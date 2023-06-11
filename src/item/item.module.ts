import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ItemController } from './item.controller';
import { itemProviders } from './item.providers';
import { ItemService } from './item.service';

@Module({
  controllers: [ItemController],
  imports: [DatabaseModule],
  providers: [...itemProviders, ItemService],
})
export class ItemModule {}
