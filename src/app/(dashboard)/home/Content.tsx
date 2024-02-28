import React from "react";
import { TimeOff } from "./_TimeOff/TimeOff";
import { LeaveDataHydration } from "@/provider/LeaveDataHydration";
import { Notifications } from "./_Notifications/Notifications";
import { Database } from "@/types/database.types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { EmplyoeeDataHydration } from "@/provider/EmplyoeeDataHydration";
export default async function Content() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user?.id;
  return (
    <main className="mx-auto -mt-16 flex h-full w-full max-w-[80rem] flex-row items-start gap-6">
      <LeaveDataHydration>
        <EmplyoeeDataHydration employeeId={user_id as string}>
          <TimeOff />
        </EmplyoeeDataHydration>
        <Notifications />
      </LeaveDataHydration>
    </main>
  );
}
