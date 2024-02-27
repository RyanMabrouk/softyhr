import getData from "@/api/getData";
import getHiring from "@/api/Hiring/getHiring";
import { useQuery } from "@tanstack/react-query";

export type MultipleValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | undefined;

type QueryKeyType = string | number | MultipleValue;

export default function useHiringGuest(
  match?: {
    [key: string]: MultipleValue;
  },
  column?: string,
  page?: number,
  rowsPerPage?: number,
  filter?: string | null,
) {
  const queryKey: any = ["Hiring", page, filter, match].filter(
    Boolean,
  ) as QueryKeyType;
  const {
    data: Hiring,
    isPlaceholderData,
    isPending,
  } = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      page != undefined && rowsPerPage != undefined
        ? getHiring("Hiring", {
            match,
            StartPage: (page - 1) * rowsPerPage,
            EndPage: page * rowsPerPage,
            column: `${column || "*"},candidates(id,created_at)`,
            filter,
          })
        : getHiring("Hiring", {
            match,
            filter,
            column,
          }),
  });
  return {
    Hiring: {
      data: Hiring?.data,
      error: Hiring?.error,
      isPending: isPending,
      isPlaceholderData,
      meta: Hiring?.meta,
    },
  };
}
