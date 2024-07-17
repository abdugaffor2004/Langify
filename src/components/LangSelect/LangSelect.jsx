import { Select } from '@mantine/core';
import { LANGUAGES } from '../../data/languages';

export const LangSelect = ({ value, onChange }) => {
  const languageOptions = Object.entries(LANGUAGES).map(([key, value]) => ({
    value: key,
    label: value,
  }));
  return <Select data={languageOptions} value={value} onChange={onChange} clearable={false} />;
};
