import React from "react";
import { redirect } from "next/navigation";
import getSession from "@/api/getSession";
import Nav from "../_layout/_Nav/Nav";
async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <Nav />
      <main className="h-full min-h-screen w-full ">{children}</main>
    </div>
  );
}

export default Layout;
