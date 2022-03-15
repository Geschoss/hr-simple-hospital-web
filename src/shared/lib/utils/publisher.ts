type BaseSocketMessage<R> = {
  method: string;
} & R;

export type SocketErrorMessage = BaseSocketMessage<{
  status: 'error';
  error: string;
}>;

export type SocketSuccesMessage<P> = BaseSocketMessage<{
  status: 'ok';
  payload?: P;
}>;

export type SocketMessage<P = Record<string, any>> =
  | SocketErrorMessage
  | SocketSuccesMessage<P>;

type Subscriber<P> = (payload: SocketMessage<P>) => void;

export class Publisher {
  subscribersMap = new Map<string, Set<Subscriber<any>>>();

  notify(event: string, data: any) {
    const subscribers = this.subscribersMap.get(event);
    if (subscribers === undefined) {
      console.log(`Can't find subscribes by event name: ${event}`);
      return;
    }
    subscribers.forEach((subscriber) => subscriber(data));
  }

  on<P>(event: string, cb: Subscriber<P>) {
    let subscribers = this.subscribersMap.get(event);

    if (subscribers === undefined) {
      subscribers = new Set<Subscriber<P>>();
      this.subscribersMap.set(event, subscribers);
    }
    subscribers.add(cb);
    return () => {
      subscribers && subscribers.delete(cb);
    };
  }
}
