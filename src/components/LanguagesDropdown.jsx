import { Select } from '@mantine/core';
import { LANGUAGES } from '../data/languages';
import styles from './LanguagesDropdown.module.css';

export const LanguagesDropdown = ({ currentLang, setCurrentLang }) => (
  <Select
    data={LANGUAGES.map(lang => ({ value: lang.id, label: lang.label }))}
    value={currentLang}
    onChange={setCurrentLang}
    className={styles.dropdownItem}
    clearable={false}
  />
);
