import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { translate } from 'google-translate-api-browser';

interface TranslateParams {
  text: string;
  to: string;
  from: string;
}

interface TranslateResult {
  text: string;
  from: {
    language: { iso: string };
    text: { value: string };
  };
}

interface UseTranslationMutationProps {
  onSuccess: (data: TranslateResult) => void;
}

export const useTranslateMutation = ({
  onSuccess,
}: UseTranslationMutationProps): UseMutationResult<TranslateResult, Error, TranslateParams> =>
  useMutation({
    mutationFn: ({ text, to, from }) =>
      translate(text, {
        to,
        from,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess,
  });
