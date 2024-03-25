"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { CategoryEdit } from "./_componants/CategoryEdit";
import { AddCategoryBtn } from "./_componants/buttons/AddCategoryBtn";
import useCategoriesData from "./hooks/useCategoriesData";
import { BsFillStopwatchFill } from "react-icons/bs";
import { generateLeaveCategorieIcon } from "@/helpers/TimeOff/leave.helpers";
import { usePathname } from "next/navigation";
import { SettingsBtn } from "./_componants/buttons/SettingsBtn";
export default function Page() {
  const categories_data = useCategoriesData();
  const pathname = usePathname();
  return (
    <div className="flex h-full min-w-full flex-col px-6 py-4">
      <header className="flex flex-row items-center gap-1">
        <BsFillStopwatchFill className="h-6 w-6 text-fabric-700" />
        <span className="text-xl text-black opacity-85">Overview</span>
      </header>
      <section className="flex-rox flex items-center justify-between">
        <Link
          href={{
            pathname: pathname,
            query: { popup: "ADD_NEW_POLICY" },
          }}
          className=" mb-1 mt-5 flex h-9 max-w-[11rem] flex-row items-center justify-center gap-1 rounded-md border border-fabric-600 px-2 py-1 text-center text-[0.9rem] font-semibold text-fabric-700 shadow-sm transition-all  ease-linear hover:border-fabric-600 hover:text-fabric-600 hover:shadow-md"
        >
          <MdOutlineAddCircle />
          <span>New policy</span>
        </Link>
        <SettingsBtn />
      </section>
      <hr className="my-3 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <main className="flex flex-row flex-wrap items-center gap-4 py-2">
        {categories_data
          ?.sort((a, b) => {
            if (a.disabled && !b.disabled) return 1;
            else if (!a.disabled && b.disabled) return -1;
            else return 0;
          })
          .map((e, i) => (
            <CategoryEdit
              key={"CategoryEdit" + i}
              {...e}
              icon={generateLeaveCategorieIcon({
                categorie: e,
                className: "text-fabric-700 h-9 w-9",
              })}
              policies={e.policies?.length}
              employees={e.employees?.length}
            />
          ))}
        <AddCategoryBtn />
      </main>
    </div>
  );
}
