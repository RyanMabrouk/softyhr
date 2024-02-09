"use client";
import useUserRole from "@/hooks/useUserRole";
import React from "react";
export default function RoleGuard({
  children,
  permissions,
}: {
  children: React.ReactNode;
  permissions: string[];
}) {
  // active user role
  const {
    role: { data: role },
  } = useUserRole();
  // if user has all permissions
  if (permissions.every((p) => role?.permissions.includes(p))) {
    return children;
  }
  // if not
  return false;
}
