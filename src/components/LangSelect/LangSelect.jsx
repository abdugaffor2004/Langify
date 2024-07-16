import { Select } from '@mantine/core';
import { LANGUAGES } from '../../data/languages';
import styles from './LangSelect.module.css';

export const LangSelect = ({ value, onChange }) => (
  <Select
    data={Object.keys(LANGUAGES).map(key => ({
      value: key,
      label: LANGUAGES[key],
    }))}
    value={value}
    onChange={onChange}
    className={styles.dropdownItem}
    clearable={false}
  />
);
