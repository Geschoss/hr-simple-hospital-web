import { WSClient, wsClient } from 'shared/api';
import { Store } from './store';

const createEffectSDK =
  (socket: WSClient) =>
  <V>(method: string, store: Store<V>, cb: (payload: any) => V) => {
    
    socket.on<V>(method, (payload) => store.update(cb(payload)));

    return () => {
      socket.send({ method });
    };
  };

export const createEffect = createEffectSDK(wsClient);
