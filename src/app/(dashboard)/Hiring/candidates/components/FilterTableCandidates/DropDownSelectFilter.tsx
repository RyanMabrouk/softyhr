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
      name="filter"
      defaultValue={{ label: "Filtrer", value: "none" }}
      required={true}
      group={false}
      inputLabel="Filtrer"
      className="min-w-[250px]"
      setValueInParent={setFilter}
      options={[
        {
          label: "Not Working",
          value: "Not Working",
        },
      ]}
    />
  );
}

export default DropDownSelectFilter;
