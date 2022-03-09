import cn from 'classnames';
import styles from './list.module.css';

export const Header = () => (
  <tr className={cn(styles.patients_row, styles.patients_row__heading)}>
    <th className={cn(styles.patients_column, styles.patients_column__heading)}>
      id
    </th>
    <th
      className={cn(
        styles.patients_column,
        styles.patients_column__heading,
        styles.patients_column__full_width
      )}
    >
      ФИО
    </th>
    <th className={cn(styles.patients_column, styles.patients_column__heading)}>
      пол
    </th>
    <th className={cn(styles.patients_column, styles.patients_column__heading)}>
      Номер ОМС
    </th>
  </tr>
);
