"use client";
import { HistoryTable } from "@/app/(dashboard)/people/(employee)/[employeeId]/TimeOff/components/History/HistoryTable";
import useRoles from "@/hooks/useRoles";
import React from "react";
import { FaLock } from "react-icons/fa";
import useProfiles from "@/hooks/useProfiles";
import useAllPermissions from "@/hooks/useAllPermissions";
import { sameDay } from "@/helpers/date.helpers";
import { EmployeeProfileLink } from "./[role_id]/components/EmployeeProfileLink";
import { EmployyeSettingsBtn } from "./[role_id]/components/EmployyeSettingsBtn";
export default function Page() {
  const {
    roles: { data: roles },
  } = useRoles();
  const {
    profiles: { data: profiles },
  } = useProfiles();
  const {
    permissions: { data: permissions },
  } = useAllPermissions();
  const role_users_data = profiles?.map((p) => ({
    role_name: roles?.find(
      (role) =>
        role.id === permissions?.find((e) => e.user_id === p.user_id)?.role_id,
    )?.name,
    ...p,
  }));
  return (
    <div className="flex h-full min-w-full flex-col gap-4 px-6 py-4">
      <div className="flex flex-col gap-2">
        <header className="flex flex-row items-center gap-1.5">
          <FaLock className="h-5 w-5 text-fabric-700" />
          <span className="text-xl text-black opacity-85 first-letter:capitalize">
            All
          </span>
        </header>
        <span className=" text-[0.90rem] ">
          Give your Employees Access Levels to determine their access to
          information in SoftyHR.
        </span>
      </div>
      {
        <HistoryTable
          emptyMessage="No employees with this Access Level yet."
          Headers={["Name", "Level", "Last login", " "]}
          layout="grid-cols-[2fr,2fr,3fr,1fr]"
          data={role_users_data?.map((user) => ({
            Name: (
              <EmployeeProfileLink user_id={user.user_id}>
                {user?.["Basic Information"]?.["First name"] +
                  " " +
                  user?.["Basic Information"]?.["Last name"]}
              </EmployeeProfileLink>
            ),
            Level: user.role_name,
            "Last login": user.last_signed_in
              ? sameDay(new Date(user.last_signed_in), new Date())
                ? "Today at " +
                  new Date(user.last_signed_in).toLocaleTimeString()
                : new Date(user.last_signed_in).toLocaleDateString() +
                  " at " +
                  new Date(user.last_signed_in).toLocaleTimeString()
              : "Never",
            " ": (
              <div className=" flex h-[4.25rem] w-full  flex-row  items-start justify-center gap-1 px-4 pt-3 text-center align-top text-gray-27  ">
                <EmployyeSettingsBtn employeeId={user.user_id} />
              </div>
            ),
          }))}
        />
      }
    </div>
  );
}
