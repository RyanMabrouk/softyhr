import React from "react";
import Nav from "../_ui/Nav";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col">
      <Nav />
      <main className="h-full min-h-screen w-full">{children}</main>
    </div>
  );
}

export default Layout;
