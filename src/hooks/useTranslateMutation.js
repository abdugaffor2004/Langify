import { useMutation } from '@tanstack/react-query';
import { translate } from 'google-translate-api-browser';

export const useTranslateMutation = translateTranslation => {
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: ({ query, target, source }) =>
      translate(query, {
        to: target,
        from: source,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess: data => {
      const {
        text,
        from: {
          language: { iso },
        },
      } = data;

      translateTranslation(text, iso);
    },
  });

  return {
    mutate,
    isError,
    isPending,
    error,
  };
};
