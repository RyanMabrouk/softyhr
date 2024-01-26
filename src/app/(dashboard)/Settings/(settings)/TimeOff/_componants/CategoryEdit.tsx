import React from "react";
import { CategoryDropDownMenu } from "./CategoryDropDownMenu";
import { GiSightDisabled } from "react-icons/gi";
import { EnableCategoryBtn } from "./buttons/EnableCategoryBtn";
import { AddPolicyBtn } from "./buttons/AddPolicyBtn";
export function CategoryEdit({
  id,
  name,
  icon,
  policies,
  employees,
  disabled,
}: {
  id: number;
  name: string;
  icon: React.ReactNode;
  policies: number;
  employees: number;
  disabled: boolean;
}) {
  return (
    <div
      className={`group relative flex w-full max-w-[14.5rem] flex-col items-center justify-center overflow-clip rounded-md border-2 border-gray-14 px-[2rem] pb-8 pt-6 text-gray-21 transition-all ease-linear  ${disabled ? "" : "bg-gray-14 hover:bg-gray-17"}`}
    >
      <span>
        {disabled ? <GiSightDisabled className="h-9 w-9 text-gray-26" /> : icon}
      </span>
      <span className="line-clamp-1 max-w-full text-ellipsis whitespace-nowrap font-bold">
        {name}
      </span>
      <div className="flex flex-row items-center gap-1.5 text-sm ">
        {disabled ? (
          <span>Disabled</span>
        ) : (
          <>
            <span className="text-sm">{policies} policies</span>
            <span className="-mt-1.5">.</span>
            <span className="text-sm">{employees} people</span>{" "}
          </>
        )}
      </div>
      {disabled ? <EnableCategoryBtn id={id} /> : <AddPolicyBtn id={id} />}
      <div className="absolute right-2 top-2 ">
        <CategoryDropDownMenu id={id} disabled={disabled} />
      </div>
    </div>
  );
}
