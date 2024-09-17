import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { translate } from 'google-translate-api-browser';
import { TranslationResult, TranslateOptions } from 'google-translate-api-browser/types';

interface UseTranslationMutationOptions {
  onSuccess: (data: TranslationResult) => void;
}

export const useTranslateMutation = ({
  onSuccess,
}: UseTranslationMutationOptions): UseMutationResult<TranslationResult, Error, TranslateOptions> =>
  useMutation({
    mutationFn: ({ text, to, from }) =>
      translate(text, {
        to,
        from,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess,
  });
