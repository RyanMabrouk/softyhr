"use client";
import React, { useState } from "react";
import { generateLeaveCategorieIcon } from "@/helpers/leave.helpers";
import { CheckBox } from "@/app/_ui/_PopUp/components/Settings/TimeOff/AddNewPolicy/CheckBox";
import { NewCategoryBtn } from "./NewCategoryBtn";
import useLeaveData from "@/hooks/useLeaveData";
import {
  database_leave_policies_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { useSearchParams } from "next/navigation";
type categories_data_type = databese_leave_categories_type & {
  number_of_policies: number;
};
export function CategoriesCheckBox() {
  const categories_id = useSearchParams().get("categories_id") ?? "";
  const [selected, setselected] = useState(categories_id);
  const {
    leave_categories: { data: leave_categories },
    leave_policies: { data: leave_policies },
  } = useLeaveData();
  const categories_data = leave_categories?.map(
    (e: databese_leave_categories_type) => ({
      ...e,
      number_of_policies: leave_policies?.filter(
        (p: database_leave_policies_type) => p.categories_id === e.id,
      ).length,
    }),
  );
  return (
    <main className="flex flex-row flex-wrap items-center gap-4">
      <input
        type="text"
        name="categories_id"
        hidden
        readOnly
        required
        value={selected}
      />
      {categories_data?.map((category: categories_data_type) => (
        <CheckBox
          key={category.id}
          className="!w-60"
          label={category.name}
          discription={`${category.number_of_policies} policies`}
          setValueInParent={setselected}
          valueInParent={selected}
          value={category.id}
          Icon={(props) =>
            generateLeaveCategorieIcon({
              categorie: category,
              className: `h-10 w-10 text-gray-21 mr-1 opacity-95 ${props.className ?? ""}`,
            })
          }
        />
      ))}
      <NewCategoryBtn />
    </main>
  );
}
