"use client";
import getTranslation from "@/translation/getTranslation";
import { useQuery } from "@tanstack/react-query";
export default function useTranslation() {
  // ------------------get current user--------------------
  const { data, isPending } = useQuery({
    queryKey: ["profiles", "preffered_lang"],
    queryFn: () => getTranslation(),
  });
  return {
    lang: data?.lang,
    error: data?.error,
    isPending,
  };
}
