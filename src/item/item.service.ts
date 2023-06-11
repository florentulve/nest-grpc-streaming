import { Inject, Injectable } from '@nestjs/common';
import QueryStream from 'pg-query-stream';
import { DataSource, Repository } from 'typeorm';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<ReadStream> {
    const stream = this.dataSource
      .getRepository(Item)
      .createQueryBuilder('e')
      .select(['id AS id', 'label AS label'])
      //.where('user.id = :id', { id: 1 })
      .stream();
    return stream;
  }

  async findAllRaw(): Promise<ReadStream> {
    const queryRunner = this.dataSource.createQueryRunner();
    const client = await queryRunner.connect();
    const query = new QueryStream('SELECT id, label FROM item', [], {
      batchSize: 5000,
    });
    const stream = client.query(query);
    //stream.pipe(JSONStream.stringify()).pipe(process.stdout);
    return new Promise((resolve) => {
      resolve(stream);
    });
  }
}
