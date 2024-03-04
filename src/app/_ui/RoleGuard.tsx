"use client";
import useUserRole from "@/hooks/Roles/useUserRole";
import React from "react";
export default function RoleGuard({
  children,
  permissions,
  strict = true,
}: {
  children: React.ReactNode;
  permissions: string[];
  strict?: boolean;
}) {
  // active user role
  const {
    role: { data: role },
  } = useUserRole();
  // if user has all permissions
  if (strict && permissions.every((p) => role?.permissions.includes(p))) {
    return children;
  }
  // if user has some permissions
  if (!strict && permissions.some((p) => role?.permissions.includes(p))) {
    return children;
  }
  // if not
  return false;
}
