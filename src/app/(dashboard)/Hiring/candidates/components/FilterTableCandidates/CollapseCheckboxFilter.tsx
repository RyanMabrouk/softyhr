import Checkbox from "@/app/_ui/Checkbox";
import CustomCollapse from "@/app/_ui/Collapse";
import React, { useEffect, useState } from "react";
import { CheckedStatus } from "../types";

type Optionsprops = {
  title: string;
  options: CheckedStatus[] | undefined;
  filter: string[];
  setFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

function CollapseCheckboxFilter({ options, title, setFilter }: Optionsprops) {
  const [checkedStatuses, setCheckedStatuses] = useState<Array<CheckedStatus>>(
    [],
  );

  const handleCheckboxChange = (status: CheckedStatus, isChecked: boolean) => {
    if (isChecked) {
      setCheckedStatuses((prev) => [...prev, status]);
    } else {
      setCheckedStatuses((prev) =>
        prev.filter((item) => item.value !== status.value),
      );
    }
  };

  const onResetFilter = () => {
    setCheckedStatuses([]);
  };

  useEffect(() => {
    const formattedCheckedStatuses = checkedStatuses.map(
      (status) => status.value,
    );

    setFilter(formattedCheckedStatuses);
  }, [checkedStatuses, setFilter]);

  return (
    <div className="">
      <CustomCollapse
        collapseTitle={`${checkedStatuses.length > 0 ? checkedStatuses.length : ""} ${title}`}
        className="mt-2"
        hasSelectedItems={checkedStatuses.length > 0}
        onResetHandler={onResetFilter}
      >
        {options?.map((status) => (
          <Checkbox
            key={status.value}
            name={status.label}
            label={status.label}
            checked={checkedStatuses.some(
              (item) => item.value === status.value,
            )}
            onChange={(isChecked) => handleCheckboxChange(status, isChecked)}
          />
        ))}
      </CustomCollapse>
    </div>
  );
}

export default CollapseCheckboxFilter;
