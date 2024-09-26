import useSWR from "swr";
import urls from "../../utils/urls";
import { fetcher } from "./fetcher";
import queryString from "query-string";

export const useFetchVPS = (params) => {
  const url = queryString.stringifyUrl({
    url: urls.VPS,
    query: params,
  });

  const { data, isLoading, error, mutate, isValidating } = useSWR(url, fetcher);

  return {
    data: data?.result || [],
    isLoading,
    error,
    mutate,
    isValidating,
  };
};
