import { Select } from '@mantine/core';
import { LANGUAGES } from '../../data/languages';

export const LangSelect = ({ value, onChange }) => (
  <Select
    data={Object.entries(LANGUAGES).map(([key, value]) => ({
      value: key,
      label: value,
    }))}
    value={value}
    onChange={onChange}
    clearable={false}
  />
);
