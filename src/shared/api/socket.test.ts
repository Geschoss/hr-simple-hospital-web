import { WSClient } from './socket';

let send;
let socket;
let client;
let addEventListener;
beforeEach(() => {
  send = jest.fn();
  addEventListener = jest.fn();
  socket = {
    send,
    addEventListener,
  };

  client = new WSClient(socket);
});
test('WSClient:init subscribes', () => {
  expect(addEventListener.mock.calls.length).toBe(3);
  expect(addEventListener.mock.calls[0][0]).toBe('open');
  expect(addEventListener.mock.calls[1][0]).toBe('message');
  expect(addEventListener.mock.calls[2][0]).toBe('close');
});

test('WSClient:catch message from server', () => {
  const sendMessageToClient = addEventListener.mock.calls[1][1];
  
  // API to subscribe
  const payload = { method: '/patient/list', status: 'ok' };
  client.on('/patient/list', (event) => {
    expect(event).toEqual(payload);
  });

  sendMessageToClient({ data: JSON.stringify(payload) });
});

test('WSClient:send message to server', () => {
  const openSocket = addEventListener.mock.calls[0][1];
  openSocket();
  
  // API to send date
  const payload = { method: '/patient/list', status: 'ok' };
  client.send(payload);

  expect(send.mock.calls[0][0]).toEqual(JSON.stringify(payload));
});
