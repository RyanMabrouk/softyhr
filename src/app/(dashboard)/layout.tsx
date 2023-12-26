import React from "react";
import Nav from "../_ui/Nav";
import { redirect } from "next/navigation";
import getSession from "@/actions/getSession";
async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="flex h-full w-full flex-col">
      <Nav />
      <main className="h-full min-h-screen w-full">{children}</main>
    </div>
  );
}

export default Layout;
