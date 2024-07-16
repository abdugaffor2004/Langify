import { Button, Menu } from '@mantine/core';
import { LANGUAGES } from '../data/languages';
import styles from './LanguagesDropdown.module.css';

export const LanguagesDropdown = ({ currentLang, setCurrentLang }) => {
  const currentLanguage = LANGUAGES.find(lang => lang.id === currentLang);

  return (
    <Menu offset={20} shadow="md" width={200}>
      <Menu.Target>
        <Button size="md" variant="light" w="100%">
          {currentLanguage ? currentLanguage.label : 'Select the language'}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {LANGUAGES.map(lang => (
          <Menu.Item
            key={lang.id}
            value={lang.id}
            onClick={() => setCurrentLang(lang.id)}
            className={styles.dropdownItem}
          >
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
