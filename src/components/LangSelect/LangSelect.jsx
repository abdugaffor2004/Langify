import { Select } from '@mantine/core';
import { LANGUAGES } from '../../data/languages';

const languageOptions = Object.entries(LANGUAGES).map(([key, value]) => ({
  value: key,
  label: value,
}));
export const LangSelect = ({ value, onChange }) => {
  return <Select data={languageOptions} value={value} onChange={onChange} clearable={false} />;
};
