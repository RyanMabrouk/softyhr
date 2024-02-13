"use client";
import React from "react";
import useFormattedLeaves from "../hooks/useFormattedLeavs";
import { Card } from "../components/Card";
import Loader from "@/app/_ui/Loader/Loader";
import { Player } from "@lottiefiles/react-lottie-player";
import useAcceptedDeniedLeaves from "@/hooks/TimeOff/useAcceptedDeniedLeaves";
import { useQueryClient } from "@tanstack/react-query";
import { database_leave_request_status_type } from "@/types/database.tables.types";
import getAcceptedDeniedLeavs from "@/api/TimeOff/getAcceptedDeniedLeavs";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { PaginationButtons } from "../components/PaginationButtons";
export default function Page() {
  const cards_per_page_in_client = 9;
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState<"all" | "approved" | "rejected">(
    "all",
  );
  const [sort, setSort] = React.useState<"user_id" | "reviewed_at">(
    "reviewed_at",
  );
  const {
    accepted_denied_leaves: {
      data: accepted_denied_leaves,
      isPending: isPending1,
    },
  } = useAcceptedDeniedLeaves({
    page: page,
    filter,
    sort,
  });
  // prefetch next page
  const {
    accepted_denied_leaves: { data: next_page_data },
  } = useAcceptedDeniedLeaves({
    page: page + 1,
    filter,
    sort,
  });
  const { data: formatted_leavs, isPending: isPending2 } = useFormattedLeaves({
    leave_requests: accepted_denied_leaves,
  });
  const isPending = isPending1 || isPending2;
  return (
    <div className="relative mb-5 ml-5 flex min-h-full w-full flex-col">
      {formatted_leavs && formatted_leavs.length > 0 ? (
        formatted_leavs?.map((e) => (
          <Card
            {...e}
            duration_used={e.duration_used.map((d: any) => ({
              date: String(d.date),
              duration: d.duration,
            }))}
            key={"card" + e.id}
          />
        ))
      ) : isPending ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex h-full max-h-[45rem] w-full items-center justify-center">
          <Player
            src="https://lottie.host/85fb7313-2848-45c2-bdb9-2b729f57afc2/AwfmWMtW8n.json"
            className="h-60 w-60"
            loop
            autoplay
          />
        </div>
      )}
      <PaginationButtons
        page={page}
        setPage={setPage}
        dataLength={formatted_leavs?.length ?? 0}
        nextPageLength={next_page_data?.length ?? 0}
        cards_per_page_in_client={cards_per_page_in_client}
      />
      <div className="absolute -top-12 right-0 flex flex-row items-center gap-2 text-sm">
        <SelectGeneric
          inputLabel="Filter"
          className=" !w-[7.5rem]"
          setValueInParent={(e) => {
            setPage(1);
            setFilter(e);
          }}
          options={[
            {
              label: "All",
              value: "all",
            },
            {
              label: "Approved",
              value: "approved",
            },
            {
              label: "Rejected",
              value: "rejected",
            },
          ]}
        />
        <SelectGeneric
          inputLabel="Sort"
          className="!w-[7.5rem]"
          setValueInParent={(e) => {
            setPage(1);
            setSort(e);
          }}
          options={[
            {
              label: "Employee",
              value: "user_id",
            },
            {
              label: "Completed Date",
              value: "reviewed_at",
            },
          ]}
        />
      </div>
    </div>
  );
}
