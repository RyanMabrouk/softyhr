import React, { memo } from "react";
import { RowFieldType } from "@/types/database.tables.types";
import { CalendarRange } from "./calendarRange";
interface DateInputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValueEnd?: string | undefined;
  defaultValueStart?: string | undefined;
  setSelectedKeys?: React.Dispatch<React.SetStateAction<Date>> | undefined;
  data?: any;
}
function DateInputRange({ RowField, setTouched, data }: DateInputPropsType) {
  
  return (
    <div className="flex items-end justify-start gap-[1rem]">
      <CalendarRange
        label={RowField?.name}
        DataType="text"
        numberOfMonths={null}
        endDateName={RowField?.endDateName || "End Date"}
        startDateName={RowField?.startDateName || "Start Date"}
        setAction={() => setTouched && setTouched(true)}
        defaultValue={{
          from: new Date(data?.[RowField?.startDateName || ""] || new Date()),
          to: new Date(data?.[RowField?.endDateName || ""] || new Date()),
        }}
      />
    </div>
  );
}

export default memo(DateInputRange);
