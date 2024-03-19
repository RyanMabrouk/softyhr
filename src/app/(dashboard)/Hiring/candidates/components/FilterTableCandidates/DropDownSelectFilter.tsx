import DropDownGeneric from "@/app/_ui/DropDownGeneric";
import { InputGeneric } from "@/app/_ui/InputGeneric";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import React from "react";
import { VscTriangleDown } from "react-icons/vsc";

type DropDownSelectFilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
  disabled?: boolean;
};

function DropDownSelectFilter({
  filter,
  setFilter,
  disabled,
}: DropDownSelectFilterProps) {
  return (
    <SelectGeneric
      name="filter"
      defaultValue={{ label: "Filtrer", value: "none" }}
      required={true}
      group={false}
      inputLabel="Filtrer"
      className="min-w-[250px]"
      setValueInParent={setFilter}
      disabled={disabled}
      options={[
        {
          label: "string 12",
          value: "string 12",
        },
        {
          group_name: "string",
          label: "string ",
          value: "string ",
        },
        {
          group_name: "string",
          label: "string ff",
          value: "string ff",
        },
      ]}
    />
  );
}

export default DropDownSelectFilter;
