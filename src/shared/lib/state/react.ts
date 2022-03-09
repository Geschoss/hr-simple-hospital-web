import { useState, useEffect } from 'react';
import { Store } from './store';

export const useValue = <R>(store: Store<R>) => {
  const [state, setState] = useState(store.getValue());

  useEffect(() => {
    const unsibscribe = store.subscribe((value) => {
      setState(value);
    });
    return () => {
      unsibscribe();
    };
  }, [store]);

  return state;
};
