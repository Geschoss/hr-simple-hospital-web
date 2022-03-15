import { FC, useEffect } from 'react';
import { useStore } from 'effector-react';
import styles from './list.module.css';
import { Row } from './row';
import { Header } from './header';
import { Model } from 'domains/patient';

export const List: FC = () => {
  const patients = useStore(Model.$patients);

  useEffect(() => {
    Model.fetchPatients();
  }, []);

  return (
    <table className={styles.patients}>
      <tbody>
        <Header />
        {patients.map(({ id, fullName, sex, OMS }) => (
          <Row
            key={id}
            id={id}
            sex={sex}
            OMS={OMS}
            fullName={fullName}
          />
        ))}
      </tbody>
    </table>
  );
};
