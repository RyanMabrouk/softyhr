import React from "react";
import Nav from "../_Layout/_Nav/Nav";
import { redirect } from "next/navigation";
import getSession from "@/actions/getSession";
import Initialize from "@/provider/Initilize";
async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="flex h-full w-full min-h-screen flex-col">
      <Initialize>
        <Nav />
        <main className="h-full min-h-screen w-full ">{children}</main>
      </Initialize>
    </div>
  );
}

export default Layout;
