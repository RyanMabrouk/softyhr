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

  const onResetFilter = () => {
    setRange({ min: 0, max: 5 });
    setInputRange({ min: 0, max: 5 });
  };

  return (
    <div className="">
      <CustomCollapse
        collapseTitle={`${title} ${inputRange.min !== 0 || inputRange.max !== 5 ? `(${inputRange.min} - ${inputRange.max} Star)` : ""}`}
        className="mt-2"
        hasSelectedItems={range.min !== 0 || range.max !== 5}
        onResetHandler={onResetFilter}
      >
        <InputRange
          draggableTrack={false}
          allowSameValues={true}
          formatLabel={(value) => value.toString()}
          maxValue={5}
          minValue={0}
          onChange={(value) => setInputRange(value as number | Range)}
          onChangeComplete={(value) => setRange(value as rangeType)}
          value={inputRange}
        />
      </CustomCollapse>
    </div>
  );
}

export default CollapseRatingFilter;
