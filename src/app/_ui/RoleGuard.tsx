"use client";
import usePermissions from "@/hooks/usePermissions";
import useRole from "@/hooks/useRole";
import React from "react";
export default function RoleGuard({
  children,
  permissions,
}: {
  children: React.ReactNode;
  permissions: string[];
}) {
  // active user permissions
  const {
    permission: { data: user_permissions },
  } = usePermissions();
  // active user role
  const {
    role: { data: role },
  } = useRole({ id: user_permissions?.role_id });
  // if user has all permissions
  if (permissions.every((p) => role?.permissions.includes(p))) {
    return children;
  }
  // if not
  return;
}
