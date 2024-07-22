import { Select } from '@mantine/core';

export const LangSelect = ({ value, onChange, isDetecting, languages }) => {
  const languageOptions = Object.entries(languages).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const options = isDetecting
    ? languageOptions
    : languageOptions.filter(option => option.value !== 'auto');

  return (
    <Select
      allowDeselect={false}
      data={options}
      value={value}
      onChange={onChange}
      clearable={false}
    />
  );
};
