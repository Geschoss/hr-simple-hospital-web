import { FC, useCallback } from 'react';
import styles from './search.module.css';
import { UI } from 'shared';
import { Model } from 'domains/patient';

export const Search = () => {
  const handleChanged = useCallback((value: string) => {
    Model.searchPatients(value);
  }, [Model.searchPatients]);

  return (
    <div className={styles.search}>
      <UI.Input label="Поиск" onChange={handleChanged} />
    </div>
  );
};
