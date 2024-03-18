import CustomCollapse from "@/app/_ui/Collapse";
import React, { useState } from "react";
import { rangeType } from "../types";
import InputRange, { Range } from "react-input-range"; // Import Range type
import "react-input-range/lib/css/index.css";

type Optionsprops = {
  title: string;
  range: rangeType;
  setRange: React.Dispatch<React.SetStateAction<rangeType>>;
};

function CollapseRatingFilter({ title, setRange, range }: Optionsprops) {
  const [inputRange, setInputRange] = useState<any>(range);

  return (
    <div className="">
      <CustomCollapse collapseTitle={title} className="mt-2">
        <InputRange
          draggableTrack={false}
          formatLabel={(value) => value.toString()}
          maxValue={5}
          minValue={0}
          onChange={(value) => setInputRange(value as number | Range)} // Adjust the type here
          onChangeComplete={(value) => setRange(value as rangeType)}
          value={inputRange}
        />
      </CustomCollapse>
    </div>
  );
}

export default CollapseRatingFilter;
