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

export default function useHiring(
  match?: {
    [key: string]: MultipleValue;
  },
  column?: string,
  page?: number,
  rowsPerPage?: number,
  filter?: string | null,
) {
  const querykey: any = ["Hiring"] as QueryKeyType;
  if (match && match?.id) {
    querykey.push(match?.id);
  }
  if (page != undefined) {
    querykey.push(page);
  }
  if (filter) {
    querykey.push(filter);
  }
  const {
    data: Hiring,
    isPlaceholderData,
    isPending,
  } = useQuery({
    queryKey: querykey,
    queryFn: () =>
      page != undefined && rowsPerPage != undefined
        ? getHiring("Hiring", {
            match,
            StartPage: (page - 1) * rowsPerPage,
            EndPage: page * rowsPerPage,
            column: `${column || "*"},candidates(id,created_at)`,
            // TODO: filter connot be null must be fixed (as supabase does not accept null value)
            filter: filter === null ? undefined : filter,
          })
        : getHiring("Hiring", {
            match,
            // TODO: filter connot be null must be fixed (as supabase does not accept null value)
            filter: filter === null ? undefined : filter,
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
