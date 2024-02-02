"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
export default function useRealTime({
  filter,
  table,
  event = "*",
  onReceive,
}: {
  table: string;
  filter?: {
    column: string;
    value: string;
  };
  event?: string;
  onReceive: (payload: any) => void;
}) {
  const supabase = createClientComponentClient();
  const channelName = table + "_" + event;
  useEffect(() => {
    const channel = filter
      ? supabase
          .channel(channelName)
          .on(
            // @ts-ignore : works perfectly <3
            "postgres_changes",
            {
              event: event,
              schema: "public",
              table: table,
              filter: `${filter.column}=eq.${filter.value}`,
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
  }, [supabase]);
}
