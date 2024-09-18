import { useMutation, UseMutationResult } from '@tanstack/react-query';
import translate from 'node_modules/google-translate-api-browser/dest';
import { TranslateOptions } from 'node_modules/google-translate-api-browser/dest/types/TranslateOptions';
import { TranslationResult } from 'node_modules/google-translate-api-browser/dest/types/TranslationResult';

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
