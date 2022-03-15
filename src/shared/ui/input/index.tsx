import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useCallback,
  useState,
} from 'react';
import cn from 'classnames';
import styles from './input.module.css';

type Props = {
  label: string;
  type?: 'text';
  id?: string;
  onChange?: (value: string) => void;
};

export const Input: FC<Props> = ({
  label,
  type = 'text',
  id = label,
  onChange = () => {},
}) => {
  const [focused, setFocus] = useState(false);

  const handleChanged = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, [setFocus]);
  const handleBlur = useCallback(() => {
    setFocus(false);
  }, [setFocus]);

  return (
    <div
      className={cn(styles.field, {
        [styles['field--focused']]: focused,
      })}
    >
      <label htmlFor={id} className={styles.field__label}>
        {label}
      </label>
      <div className={styles.field__content}>
        <input
          id={id}
          type={type}
          onChange={handleChanged}
          className={styles.field__input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};
