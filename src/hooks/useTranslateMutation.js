import { useMutation } from '@tanstack/react-query';
import { translate } from 'google-translate-api-browser';

export const useTranslateMutation = ({ onSuccess }) =>
  useMutation({
    mutationFn: ({ text, to, from }) =>
      translate(text, {
        to,
        from,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess,
  });
