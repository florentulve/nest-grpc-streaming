import grpc from 'k6/net/grpc';

const client = new grpc.Client();
client.load(['definitions'], './src/item/item.proto');

export default () => {
  client.connect('localhost:5000', {
    plaintext: true,
  });

  //const data = { greeting: 'Bert' };
  const response = client.invoke('item.itemService/ListItemPgStream', null);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  console.log(JSON.stringify(response.message));

  client.close();
  sleep(1);
};
