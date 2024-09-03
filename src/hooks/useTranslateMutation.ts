import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { translate } from 'google-translate-api-browser';

interface ITranslateParams {
  text: string;
  to: string;
  from: string;
}

interface ITranslateResult {
  text: string;
  from: {
    language: { iso: string };
    text: { value: string };
  };
}

interface IUseTranslationMutationProps {
  onSuccess: (data: ITranslateResult) => void;
}

export const useTranslateMutation = ({
  onSuccess,
}: IUseTranslationMutationProps): UseMutationResult<ITranslateResult, Error, ITranslateParams> =>
  useMutation({
    mutationFn: ({ text, to, from }) =>
      translate(text, {
        to,
        from,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess,
  });
