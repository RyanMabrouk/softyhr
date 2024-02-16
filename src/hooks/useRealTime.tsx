"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
export default function useRealTime({
  filters,
  table,
  event = "*",
  onReceive,
}: {
  table: string;
  filters?: {
    column: string;
    value: string | number;
  }[];
  event?: "UPDATE" | "INSERT" | "DELETE" | "*";
  onReceive: (payload: any) => void;
}) {
  const supabase = createClientComponentClient();
  const channelName = table + "_" + event;
  const filterString = filters?.reduce(
    (acc, e, i) =>
      acc +
      `${e.column}=eq.${e.value}${i === filters?.length - 1 ? "" : " and "}`,
    "",
  );
  useEffect(() => {
    const channel = filterString
      ? supabase
          .channel(channelName)
          .on(
            // @ts-ignore : works perfectly <3
            "postgres_changes",
            {
              event: event,
              schema: "public",
              table: table,
              filter: filterString,
            },
            onReceive,
          )
          .subscribe()
      : supabase
          .channel(channelName)
          .on(
            // @ts-ignore : also works perfectly <3
            "postgres_changes",
            {
              event: event,
              schema: "public",
              table: table,
            },
            onReceive,
          )
          .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, event, filterString, onReceive, channelName, supabase]);
}
