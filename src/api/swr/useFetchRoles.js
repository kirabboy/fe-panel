import useSWR from "swr";
import urls from "../../utils/urls";
import { fetcher } from "./fetcher";
import queryString from "query-string";

export const useFetchRoles = (params) => {
  const url = queryString.stringifyUrl({
    url: urls.ROLES,
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
