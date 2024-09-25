import useSWR from 'swr';
import urls from '../../utils/urls';
import { fetcher } from './fetcher';

export const useFetchVPS = () => {
  const { data, isLoading, error, mutate, isValidating } = useSWR(
    urls.VPS,
    fetcher
  );

  return {
    data: data?.result || [],
    isLoading,
    error,
    mutate,
    isValidating,
  };
};
