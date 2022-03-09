import { FC } from 'react';
import cn from 'classnames';
import styles from './list.module.css';

export const Row: FC<Record<any, any>> = ({ id, fullName, sex, OMS }) => (
  <tr className={styles.patients_row}>
    <td className={cn(styles.patients_column)}>{id}</td>
    <td className={cn(styles.patients_column)}>{fullName}</td>
    <td className={cn(styles.patients_column)}>{sex}</td>
    <td className={cn(styles.patients_column)}>{OMS}</td>
  </tr>
);
