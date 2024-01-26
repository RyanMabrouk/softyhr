import getData from "@/api/getData";
import { useQuery } from "@tanstack/react-query";

export default function useHiring(match?: {
  [key: string]: string | number | boolean | null | string[] | undefined;
}) {
  const { data: Hiring, isPending } = useQuery({
    queryKey: ["Hiring" + match?.id],
    queryFn: () =>
      getData("Hiring", {
        org: true,
      }),
  });
  return {
    Hiring: {
      data: Hiring?.data,
      error: Hiring?.error,
      isPending: isPending,
    },
  };
}
