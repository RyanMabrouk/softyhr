import RoleGuard from "@/app/_ui/RoleGuard";
import React from "react";

export default function SettingsLayoutSkeleton({
  children,
  permissions,
  Navigation,
}: {
  children: React.ReactNode;
  permissions: string[];
  Navigation: React.ReactNode;
}) {
  return (
    <RoleGuard permissions={permissions}>
      <div className="flex h-full min-h-screen w-full flex-1 grow border-collapse flex-row">
        <nav className="relative mb-0 flex h-full min-h-screen min-w-[15rem] grow border-collapse flex-col border-r border-fabric-400 px-6  py-4 text-gray-21 ">
          {Navigation}
        </nav>
        <section className="h-full min-h-screen w-full">{children}</section>
      </div>
    </RoleGuard>
  );
}
