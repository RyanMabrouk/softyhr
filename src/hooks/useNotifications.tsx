"use client";
import getData from "@/api/getData";
import { database_notifications_type } from "@/types/database.tables.types";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
export default function useNotifications({ type }: { type: string }): {
  notifications: {
    data: database_notifications_type[] | undefined;
    error: PostgrestError | null;
    isPending: boolean;
  };
} {
  const { data: notifications, isPending } = useQuery({
    queryKey: ["notifications", "user", type],
    queryFn: () =>
      getData("notifications", {
        user: true,
        match: { type: type },
      }),
  });
  return {
    notifications: {
      data: notifications?.data,
      error: notifications?.error,
      isPending: isPending,
    },
  };
}
