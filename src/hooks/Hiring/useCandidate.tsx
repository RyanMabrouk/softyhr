import getCandidate from "@/api/Hiring/getCandidates";
import getData from "@/api/getData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useCandidate(
  search?: string,
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  },
  page?: number,
  rowsPerPage?: number,
  filter?: string | null,
  column?: string,
  genericFilter?: any,
  range?: any,
) {
  const querykey: any = ["Candidates"];
  if (match && match.job_id) {
    querykey.push(match.job_id);
  }
  if (page != undefined) {
    querykey.push(page);
  }
  if (filter) {
    querykey.push(filter);
  }
  if (search) {
    querykey.push(search);
  }
  if (genericFilter) {
    querykey.push(genericFilter);
  }
  if (range) {
    querykey.push(range);
  }
  const {
    data: candidates,
    isPending,
    error,
    isFetched,
    isPlaceholderData,
  } = useQuery({
    queryKey: querykey,
    queryFn: () =>
      page != undefined && rowsPerPage != undefined
        ? getCandidate("candidates", {
            match,
            column,
            StartPage: (page - 1) * rowsPerPage,
            EndPage: page * rowsPerPage,
            filter,
            search,
            genericFilter,
            range,
          })
        : getCandidate("candidates", {
            match,
            column,
            filter,
            search,
            genericFilter,
            range,
          }),
    placeholderData: keepPreviousData,
  });

  return {
    candidates: {
      data: candidates?.data,
      error: candidates?.error,
      isPending: isPending,
      isFetched: isFetched,
      meta: candidates?.meta,
      isPlaceholderData,
    },
  };
}
