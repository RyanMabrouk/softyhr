"use client";
import { table_type } from "@/types/database.tables.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
type optionsType = {
  event: "UPDATE" | "INSERT" | "DELETE" | "*";
  schema: string;
  table: table_type;
  filter?: string;
};
export default function useRealTime({
  filters,
  table,
  event = "*",
  onReceive,
}: {
  table: table_type;
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
  let options: optionsType = {
    event,
    table,
    schema: "public",
  };
  if (filterString) {
    options = {
      ...options,
      filter: filterString,
    };
  }
  useEffect(() => {
    const channel = supabase
      .channel(channelName)
      .on(
        // @ts-ignore : works perfectly <3
        "postgres_changes",
        options,
        onReceive,
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // dependencies are correctly set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, event, filterString, onReceive, channelName, supabase]);
}
