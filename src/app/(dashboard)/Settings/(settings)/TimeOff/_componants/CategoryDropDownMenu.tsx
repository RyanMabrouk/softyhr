"use client";
import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import { usePathname } from "next/navigation";
import React from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
export function CategoryDropDownMenu({
  id,
  disabled,
}: {
  id: number;
  disabled: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <MenuLinksGeneric
      id="category_dropdown_menu"
      options={[
        {
          name: "Edit Category",
          link: {
            pathname: pathname,
            query: { categories_id: id, popup: "EDIT_LEAVE_CATEGORY" },
          },
        },
        {
          name: disabled ? "Enable Category" : "Disable Category",
          link: {
            pathname: pathname,
            query: {
              categories_id: id,
              popup: disabled
                ? "ENABLE_LEAVE_CATEGORY"
                : "DISABLE_LEAVE_CATEGORY",
            },
          },
        },
        {
          name: "Delete Category",
          link: {
            pathname: pathname,
            query: { categories_id: id, popup: "DELETE_LEAVE_CATEGORY" },
          },
        },
      ]}
      setOpenValueInParent={setOpen}
    >
      <FaEllipsisVertical
        className={`h-7 w-7 cursor-pointer rounded-md border border-transparent p-1 text-gray-21 transition-all ease-linear hover:border-gray-21 hover:bg-white group-hover:opacity-100 ${open ? "border-gray-21 bg-white" : "opacity-0"}`}
      />
    </MenuLinksGeneric>
  );
}
