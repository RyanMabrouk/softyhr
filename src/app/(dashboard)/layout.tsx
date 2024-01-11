import React from "react";
import { redirect } from "next/navigation";
import getSession from "@/api/getSession";
import Initialize from "@/provider/Initilize";
import Nav from "../_Layout/_Nav/Nav";
async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <Initialize>
        <Nav />
        <main className="h-full min-h-screen w-full ">{children}</main>
      </Initialize>
    </div>
  );
}

export default Layout;
