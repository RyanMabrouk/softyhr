import React from "react";
import Header from "./Header";
import Content from "./Content";
import { Database } from "@/types/database.types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { EmplyoeeDataHydration } from "@/provider/EmplyoeeDataHydration";
export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user?.id;
  return (
    <EmplyoeeDataHydration employeeId={user_id as string}>
      <div className="flex min-h-screen w-screen flex-col">
        <div className="flex h-[13rem] w-full flex-row items-start bg-gradient-to-r from-color-primary-7 to-color-primary-9 py-10">
          <Header />
        </div>
        <main className="mx-auto -mt-16 flex h-full w-full max-w-[80rem] flex-row items-start gap-6">
          <Content />
        </main>
      </div>
    </EmplyoeeDataHydration>
  );
}
