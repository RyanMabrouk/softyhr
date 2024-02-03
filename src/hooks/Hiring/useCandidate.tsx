import getCandidate from "@/api/getCandidates";
import getData from "@/api/getData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useCandidate(
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  },
  page?: number,
  rowsPerPage?: number,
  filter?: string | null,
) {
  const querykey: any = ["Candidates"];
  if (match && match.job_id) {
    querykey.push(match.job_id);
  }
  if (page != undefined) {
    querykey.push(page);
  }
  console.log("----------here----------", page);
  if (filter) {
    querykey.push(filter);
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
            match: match,
            StartPage: (page - 1) * rowsPerPage,
            EndPage: page  * rowsPerPage,
            filter,
          })
        : getCandidate("candidates", {
            match: match,
            filter,
          }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
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
