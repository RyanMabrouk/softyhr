import getCandidate from "@/api/getCandidates";
import getData from "@/api/getData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useCandidate(
  match?: {
    [key: string]: string | number | boolean | null | string[] | undefined;
  },
  page?: number,
  rowsPerPage?: number,
) {
  console.log(page, match);
  const {
    data: candidates,
    isPending,
    error,
    isFetched,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["Candidates", match && match, page && page],
    queryFn: () =>
      page && rowsPerPage
        ? getCandidate("candidates", {
            match: match,
            StartPage: page * rowsPerPage,
            EndPage: (page + 1) * rowsPerPage,
          })
        : getCandidate("candidates", {
            match: match,
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
