"use client";
import usePermissions from "./usePermissions";
import useRole from "./useRole";
export default function useUserRole() {
  // active user permissions
  const {
    permission: { data: user_permissions, isPending: isPendingPermissions },
  } = usePermissions();
  // active user role
  const {
    role: { data: role, isPending: isPendingRole },
  } = useRole({ id: user_permissions?.role_id });
  const isPending = isPendingPermissions || isPendingRole;
  return {
    role: {
      data: role,
      isPending,
    },
  };
}
