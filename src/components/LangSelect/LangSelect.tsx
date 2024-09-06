import { Select } from '@mantine/core';
import { LANGUAGES } from '../../data/languages';
import ISO6391 from 'iso-639-1';
import { FC } from 'react';

interface ILangSelectProps {
  value: string;
  onChange: <T>(value: T) => void;
  withAuto: Boolean;
  detectedLang: string;
}

const languageOptions = Object.entries(LANGUAGES).map(([key, value]) => ({
  value: key,
  label: value,
}));

export const LangSelect: FC<ILangSelectProps> = ({ value, onChange, withAuto, detectedLang }) => {
  const autoLabel = detectedLang
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
