import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <div className="h-full w-full">{children}</div>;
}

export default layout;
