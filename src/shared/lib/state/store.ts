type Subscriber<P> = (value: P) => void;

export const createStore = <V>(defaultValue: V) =>
  new Store<V>(defaultValue);

export class Store<V> {
  private value: V;
  private readonly subscribers: Set<Subscriber<V>> = new Set();
  constructor(value: V) {
    this.value = value;
  }
  getValue() {
    return this.value;
  }
  subscribe(cb: Subscriber<V>) {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }
  update(value: V) {
    this.value = value;
    this.subscribers.forEach((subscriber) => {
      subscriber(this.value);
    });
  }
}
