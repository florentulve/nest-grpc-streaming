import { Controller } from '@nestjs/common';
import { Observable, concatAll, from, map } from 'rxjs';
import {
    Empty,
    ItemResponse,
    ItemServiceController,
    ItemServiceControllerMethods,
} from './item';
import { ItemService } from './item.service';

@Controller('item')
// Generated decorator that applies all the @GrpcMethod and @GrpcStreamMethod to the right methods
@ItemServiceControllerMethods()
export class ItemController implements ItemServiceController {
  constructor(private itemService: ItemService) {}

  listItemPgStream(request: Empty): Observable<ItemResponse> {
    performance.mark('req-pg-start');
    const data = this.itemService.findAllRaw();
    return from(data).pipe(
      map((readableStream) => {
        readableStream.on('end', () => {
          performance.mark('req-pg-stream-end');
          console.log(
            performance.measure('stream', 'req-pg-start', 'req-pg-stream-end'),
          );
        });
        return from(readableStream);
      }),
      concatAll(),
    );
  }

  listItemTypeOrmStream(request: Empty): Observable<ItemResponse> {
    performance.mark('req-orm-start');
    const data = this.itemService.findAll();
    return from(data).pipe(
      map((readableStream) => {
        readableStream.on('end', () => {
          performance.mark('req-orm-stream-end');
          console.log(
            performance.measure(
              'stream',
              'req-orm-start',
              'req-orm-stream-end',
            ),
          );
        });
        return from(readableStream);
      }),
      concatAll(),
    );
  }
}
