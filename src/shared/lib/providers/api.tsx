import { createContext, FC } from 'react';
import { WSClient } from 'shared/api';

export const ApiContext = createContext<WSClient>({} as WSClient);

export const ApiProvider: FC<{ socket: WSClient }> = ({
  children,
  socket,
}) => {
  return (
    <ApiContext.Provider value={socket}>
      {children}
    </ApiContext.Provider>
  );
};
