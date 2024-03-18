import CustomCollapse from "@/app/_ui/Collapse";
import React, { useState } from "react";
import { rangeType } from "../types";
import InputRange, { Range } from "react-input-range"; // Import Range type
import "react-input-range/lib/css/index.css";
import { CalendarGeneric } from "@/app/_ui/CalenderGeneric";

type Optionsprops = {
  title?: string;
  range?: rangeType;
  setRange?: React.Dispatch<React.SetStateAction<rangeType>>;
};

function CollapseDatesFilter({ title, setRange, range }: Optionsprops) {
  const [inputDateRange, setInputDateRange] = useState<any>({
    min: new Date(1900),
    max: new Date(),
  });

  return (
    <div className="">
      <CustomCollapse collapseTitle={title} className="mt-2">
        <div className="ml-2">
          <p className="mt-1 text-sm">From:</p>
          <input
            className="my-1 w-full cursor-pointer border border-gray-300 p-1 outline-none"
            type="date"
            name="startDate"
            id="startDate"
            onChange={(value) =>
              setInputDateRange({ ...inputDateRange, min: value })
            }
          />
          <p className="mt-1 text-sm">To:</p>
          <input
            className="my-1 w-full cursor-pointer border border-gray-300 p-1 outline-none"
            type="date"
            name="endDate"
            id="endDate"
            onChange={(value) =>
              setInputDateRange({ ...inputDateRange, max: value })
            }
          />
        </div>
      </CustomCollapse>
    </div>
  );
}

export default CollapseDatesFilter;
