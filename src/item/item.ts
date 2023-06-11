/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "item";

/** item/item.proto */

export interface ItemResponse {
  id: number;
  label: string;
}

export interface Empty {
}

export const ITEM_PACKAGE_NAME = "item";

export interface ItemServiceClient {
  listItemTypeOrmStream(request: Empty): Observable<ItemResponse>;

  listItemPgStream(request: Empty): Observable<ItemResponse>;
}

export interface ItemServiceController {
  listItemTypeOrmStream(request: Empty): Observable<ItemResponse>;

  listItemPgStream(request: Empty): Observable<ItemResponse>;
}

export function ItemServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["listItemTypeOrmStream", "listItemPgStream"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ItemService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ItemService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ITEM_SERVICE_NAME = "ItemService";
