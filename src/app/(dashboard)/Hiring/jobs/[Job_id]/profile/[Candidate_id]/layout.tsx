import React, { ReactNode } from "react";
import ProfileLayout from "../components/ProfileLayout";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full">
      <ProfileLayout>{children}</ProfileLayout>
    </div>
  );
}

export default layout;
