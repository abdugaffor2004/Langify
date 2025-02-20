import { Select } from '@mantine/core';
import { LANGUAGES } from '../../data/languages';
import ISO6391 from 'iso-639-1';
import { FC } from 'react';

interface LangSelectProps {
  value: string;
  onChange: (value: string | null) => void;
  withAuto?: boolean;
  detectedLang?: string;
}

const languageOptions = Object.entries(LANGUAGES).map(([key, value]) => ({
  value: key,
  label: value,
}));

export const LangSelect: FC<LangSelectProps> = ({ value, onChange, withAuto, detectedLang }) => {
  const autoLabel = detectedLang && detectedLang !== 'auto'
    ? `Detected (${ISO6391.getName(detectedLang)})`
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
