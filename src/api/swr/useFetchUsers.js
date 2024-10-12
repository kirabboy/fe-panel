import useSWR from "swr";
import urls from "../../utils/urls";
import { fetcher } from "./fetcher";
import queryString from "query-string";

export const useFetchUsers = (params) => {
  const url = queryString.stringifyUrl({
    url: urls.USERS,
    query: params,
  });

  const { data, isLoading, error, mutate, isValidating } = useSWR(url, fetcher);

  return {
    data: data?.result || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
    isValidating,
  };
};
