import RoleGuard from "@/app/_ui/RoleGuard";
import React from "react";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard
      permissions={[
        "accept:leave_requests",
        "deny:leave_requests",
        "view:leave_requests_note",
      ]}
    >
      {children}
    </RoleGuard>
  );
}
