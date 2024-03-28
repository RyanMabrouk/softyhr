import getCandidate from "@/api/Hiring/getCandidates";
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
  /*if (search) {
    querykey.push(search);
  }*/
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
            // TODO: filter connot be null must be fixed (as supabase does not accept null value)
            filter: filter === null ? undefined : filter,
            search,
          })
        : getCandidate("candidates", {
            match,
            column,
            // TODO: filter connot be null must be fixed (as supabase does not accept null value)
            filter: filter === null ? undefined : filter,
            search,
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
