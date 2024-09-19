import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { translate } from 'google-translate-api-browser/translate';
import { TranslateOptions } from 'google-translate-api-browser/types/TranslateOptions';
import { TranslationResult } from 'google-translate-api-browser/types/TranslationResult';

interface UseTranslationMutationOptions {
  onSuccess: (data: TranslationResult) => void;
}

interface TranslateRequestOptions extends Pick<TranslateOptions, 'from' | 'to'> {
  text: string;
}

export const useTranslateMutation = ({
  onSuccess,
}: UseTranslationMutationOptions): UseMutationResult<
  TranslationResult,
  Error,
  TranslateRequestOptions
> =>
  useMutation({
    mutationFn: ({ text, to, from }) =>
      translate(text, {
        to,
        from,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess,
  });
