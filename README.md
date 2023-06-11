# Grpc streaming example

Spawn database

```sh
podman run --name pg -e POSTGRES_USER=nest -e POSTGRES_DB=nest -e POSTGRES_PASSWORD=nest -p 5432:5432 -d postgres:15
```

Start service

```sh
npm run start
```

Generate data

```sql
insert into item (
    label
)
select
    md5(random()::text)
from generate_series(1, 1000000) s(i)
```

stream data

```sh
time podman run --network host fullstorydev/grpcurl:latest -plaintext  localhost:5000  item.ItemService/ListItemTypeORMStream
```

Executed in   10.62 secs    fish           external
