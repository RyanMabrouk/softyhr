import CustomCollapse from "@/app/_ui/Collapse";
import React, { useState } from "react";
import { rangeType } from "../types";
import "react-input-range/lib/css/index.css";

type Optionsprops = {
  title: string;
  range: rangeType;
  setRange: React.Dispatch<React.SetStateAction<rangeType>>;
};

function CollapseDatesFilter({ title, setRange, range }: Optionsprops) {
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setRange({ ...range, min: value });
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRange({ ...range, max: value });
  };

  const onResetFilter = () => {
    setRange({ min: "", max: "" });
  };

  return (
    <div className="">
      <CustomCollapse
        collapseTitle={title}
        className="mt-2"
        hasSelectedItems={range.min !== "" || range.max !== ""}
        onResetHandler={onResetFilter}
      >
        <div className="ml-2">
          <p className="mt-1 text-sm">From:</p>
          <input
            className="my-1 w-full cursor-pointer border border-gray-300 p-1 text-sm outline-none"
            type="date"
            name="startDate"
            id="startDate"
            max={range.max}
            value={range.min}
            onChange={handleStartDateChange}
          />
          <p className="mt-1 text-sm">To:</p>
          <input
            className="my-1 w-full cursor-pointer border border-gray-300 p-1 text-sm outline-none"
            type="date"
            name="endDate"
            id="endDate"
            value={range.max}
            min={range.min}
            onChange={handleEndDateChange}
          />
        </div>
      </CustomCollapse>
    </div>
  );
}

export default CollapseDatesFilter;
