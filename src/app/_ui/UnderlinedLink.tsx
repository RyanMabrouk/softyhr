"use client";
import React from "react";
export function UnderlinedLink({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex cursor-pointer flex-row items-center gap-2 text-color5-600 hover:text-fabric-700 hover:underline "
      suppressHydrationWarning
    >
      {children}
    </span>
  );
}
