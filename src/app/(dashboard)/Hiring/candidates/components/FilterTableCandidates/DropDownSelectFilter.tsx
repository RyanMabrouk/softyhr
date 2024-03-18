import DropDownGeneric from "@/app/_ui/DropDownGeneric";
import { InputGeneric } from "@/app/_ui/InputGeneric";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import React from "react";
import { VscTriangleDown } from "react-icons/vsc";

type DropDownSelectFilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

function DropDownSelectFilter({
  filter,
  setFilter,
}: DropDownSelectFilterProps) {
  return (
    <SelectGeneric
      name="policy_id"
      defaultValue={{ label: "Policies", value: "none" }}
      required={true}
      group={false}
      inputLabel="-Select policies-"
      className="min-w-[250px]"
      setValueInParent={setFilter}
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
