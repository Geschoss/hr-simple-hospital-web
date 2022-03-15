import { Publisher, SocketMessage } from 'shared/lib';

export class WSClient extends Publisher {
  ready = false;
  queue: SocketMessage[] = [];
  socket: Pick<WebSocket, 'send' | 'addEventListener'>;
  constructor(socket) {
    super();
    this.socket = socket;

    this.socket.addEventListener('open', () => {
      this.ready = true;
      this.notifyQueue();
      console.log(`Connection has been established`);
    });

    this.socket.addEventListener('message', (event) => {
      this.onMessage(event);
    });

    this.socket.addEventListener('close', () => {
      this.ready = false;
      console.log(`Connection has been closed`);
    });
  }

  private onMessage(event: MessageEvent<string>) {
    try {
      const response = JSON.parse(event.data);
      const { method } = response;
      this.notify(method, response);
    } catch (error) {
      console.log(`Can't parse message payload`, error);
      throw new Error(`Can't parse message payload`);
    }
  }

  send<P>(payload: SocketMessage<P>) {
    if (!this.ready) {
      this.queue.push(payload);
      return;
    }
    const message = JSON.stringify(payload);
    this.socket.send(message);
  }

  notifyQueue() {
    while (this.queue.length > 0) {
      const msg = this.queue.pop();
      if (msg) {
        this.send(msg);
      }
    }
  }
}
