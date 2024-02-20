"use client";
import React from "react";
import SettingsLayoutSkeleton from "../SettingsLayoutSkeleton";
import Link from "next/link";
import useRoles from "@/hooks/useRoles";
import { usePathname } from "next/navigation";
import useProfiles from "@/hooks/useProfiles";
import useAllPermissions from "@/hooks/useAllPermissions";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    roles: { data: roles },
  } = useRoles();
  const {
    profiles: { data: profiles },
  } = useProfiles();
  const {
    permissions: { data: permissions },
  } = useAllPermissions();
  const rolesData = roles?.map((role) => ({
    ...role,
    users: permissions?.filter((permission) => permission.role_id === role.id)
      .length,
  }));
  return (
    <SettingsLayoutSkeleton
      permissions={["access:/Settings/AccessLevels"]}
      Navigation={
        <>
          <header className="mb-6 text-xl text-black opacity-85">Levels</header>
          <Link
            className={`rounded-sm p-2 text-[0.95rem] font-normal transition-all ease-linear hover:bg-gray-14 ${pathname === "/Settings/AccessLevels" ? "bg-gray-14 font-semibold text-fabric-700" : ""}`}
            href={"/Settings/AccessLevels"}
          >
            All ({profiles?.length})
          </Link>
          <hr className="my-3 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
          {rolesData?.map((role, index) => (
            <Link
              key={index + role.name}
              className={`rounded-sm p-2 text-[0.95rem] font-normal transition-all ease-linear hover:bg-gray-14 ${pathname === `/Settings/AccessLevels/${role.id}` ? "bg-gray-14 font-semibold text-fabric-700 " : ""}`}
              href={`/Settings/AccessLevels/${role.id}`}
            >
              {`${role.name} (${role.users})`}
            </Link>
          ))}
        </>
      }
    >
      {children}
    </SettingsLayoutSkeleton>
  );
}
