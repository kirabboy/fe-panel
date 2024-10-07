import useSWR from "swr";
import urls from "../../utils/urls";
import { fetcher } from "./fetcher";
import queryString from "query-string";

export const useFetchServerInfo = (params) => {
  const url = queryString.stringifyUrl({
    url: urls.SERVER_INFO,
    query: params,
  });

  const { data, isLoading, error, mutate, isValidating } = useSWR(
    url,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  return {
    data: data || [],
    pagination: {
      total: data?.total || 0,
    },
    isLoading,
    error,
    mutate,
    isValidating,
  };
};
