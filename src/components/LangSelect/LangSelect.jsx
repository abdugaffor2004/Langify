import { Select } from '@mantine/core';
import { LANGUAGES } from '../../data/languages';
import ISO6391 from 'iso-639-1';

const languageOptions = Object.entries(LANGUAGES).map(([key, value]) => ({
  value: key,
  label: value,
}));

export const LangSelect = ({ value, onChange, withAuto, detectedSource }) => {
  const autoLabel = detectedSource
    ? `Detected (${ISO6391.getName(detectedSource)})`
    : 'Detect language';

  const options = withAuto
    ? [{ value: 'auto', label: autoLabel }, ...languageOptions]
    : languageOptions;

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
