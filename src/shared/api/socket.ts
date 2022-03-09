export type SocketMessage<P = Record<string, any>> = {
  method: string;
  status?: 'ok' | 'errro';
  payload?: P;
  error?: string;
};
type Subscriber<P> = (payload: SocketMessage<P>) => void;

export class WSClient {
  query: SocketMessage[] = [];
  subsMap = new Map<string, Set<Subscriber<any>>>();
  ready = false;
  socket: Pick<WebSocket, 'send' | 'addEventListener'>;
  constructor(socket) {
    this.socket = socket;

    this.socket.addEventListener('open', () => {
      this.ready = true;
      while (this.query.length > 0) {
        const msg = this.query.pop();
        if (msg) {
          this.send(msg);
        }
      }
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
      const subscribers = this.subsMap.get(method);
      if (subscribers === undefined) {
        console.log(`Can't find subscribes to method ${method}`);
        return;
      }
      subscribers.forEach((subscriber) => subscriber(response));
    } catch (error) {
      console.log(`Can't parse message payload`, error);
      throw new Error(`Can't parse message payload`);
    }
  }

  on<P>(method: string, cb: Subscriber<P>) {
    let subscribers = this.subsMap.get(method);
    if (subscribers === undefined) {
      subscribers = new Set<Subscriber<P>>();
      this.subsMap.set(method, subscribers);
    }
    subscribers.add(cb);
    return () => {
      subscribers && subscribers.delete(cb);
    };
  }

  send<P>(payload: SocketMessage<P>) {
    if (!this.ready) {
      this.query.push(payload);
      return;
    }
    const message = JSON.stringify(payload);
    this.socket.send(message);
  }
}
