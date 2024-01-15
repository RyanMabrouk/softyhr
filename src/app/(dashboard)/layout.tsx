import { headers } from "next/headers";
import React from "react";
import { redirect, usePathname } from "next/navigation";
import getSession from "@/api/getSession";
import Initialize from "@/provider/Initilize";
import Nav from "../_layout/_Nav/Nav";
import { getLogLevel, getLogger } from "@/logging/log-util";
async function Layout({
  children,
  params: { employeeId },
}: {
  children: React.ReactNode;
  params: { employeeId: string };
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <Initialize employeeId={employeeId}>
        <Nav />
        <main className="h-full min-h-screen w-full ">{children}</main>
      </Initialize>
    </div>
  );
}

export default Layout;
