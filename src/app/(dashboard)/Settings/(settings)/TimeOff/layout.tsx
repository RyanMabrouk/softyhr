"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import useCategoriesData from "./hooks/useCategoriesData";
import { generateLeaveCategorieIcon } from "@/helpers/leave.helpers";
import RoleGuard from "@/app/_ui/RoleGuard";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const categories_data = useCategoriesData();
  const { policy_id } = useParams();
  return (
    <RoleGuard permissions={["access:/Settings/TimeOff"]}>
      <div className="flex h-full min-h-screen w-full flex-1 grow border-collapse flex-row">
        <nav className="relative mb-0 flex h-full min-h-full min-w-[15rem] grow border-collapse flex-col border-r border-fabric-400 px-6  py-4 text-gray-21 ">
          <header className="mb-6 text-xl text-black opacity-85">
            Time Off
          </header>
          <Link
            className={`   rounded-sm p-2 text-[0.95rem] font-normal hover:bg-gray-14 ${pathname === "/Settings/TimeOff" ? "bg-gray-14 font-bold text-fabric-700" : ""}`}
            href={"/Settings/TimeOff"}
          >
            Overview
          </Link>
          <hr className="my-3 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
          {categories_data?.map((e, index) => (
            <div key={"categories" + index} className="flex flex-col">
              <div className=" mb-1.5 mt-1 flex flex-row items-center gap-1.5">
                {generateLeaveCategorieIcon({
                  categorie: e,
                  className: "text-fabric-700",
                })}{" "}
                <span className="text-sm">{e.name}</span>
              </div>
              {e.policies.length === 0 ? (
                <span className="px-1 font-light text-gray-33">
                  No Policies
                </span>
              ) : (
                e.policies.map((p) => (
                  <Link
                    key={p.name}
                    href={`/Settings/TimeOff/${p.id}`}
                    className={`rounded-sm p-2 text-[0.95rem] font-normal transition-all ease-linear hover:bg-gray-14 ${Number(policy_id) === p.id ? " bg-gray-14 font-bold !text-fabric-700" : ""}`}
                  >
                    <span>{`${p.name} (${p.employees?.length})`}</span>
                  </Link>
                ))
              )}
              <hr className="my-3 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
            </div>
          ))}
        </nav>
        <section className="h-full min-h-screen w-full">{children}</section>
      </div>
    </RoleGuard>
  );
}
