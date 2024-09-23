import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { TranslationResult } from 'google-translate-api-browser/types/TranslationResult';
import { Language } from '../data/languages';
import translate from 'google-translate-api-browser';


interface UseTranslationMutationOptions {
  onSuccess: (data: TranslationResult) => void;
}

interface TranslateRequestOptions {
  text: string;
  from: Language;
  to: Language;
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
