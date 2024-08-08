import { useMutation } from '@tanstack/react-query';
import { translate } from 'google-translate-api-browser';

export const useTranslateMutation = ({ onSuccess }) =>
  useMutation({
    mutationFn: ({ query, target, source }) =>
      translate(query, {
        to: target,
        from: source,
        corsUrl: 'http://cors-anywhere.herokuapp.com/',
      }),
    onSuccess,
  });
