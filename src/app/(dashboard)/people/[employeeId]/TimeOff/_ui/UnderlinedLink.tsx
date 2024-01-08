import React from "react";

export function UnderlinedLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="cursor-pointer text-color5-600 hover:text-fabric-700 hover:underline ">
      {children}
    </span>
  );
}
