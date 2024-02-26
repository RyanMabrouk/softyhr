import React, { memo } from "react";
import { RowFieldType } from "@/types/database.tables.types";
import { CalendarGeneric } from "@/app/_ui/CalenderGeneric";
import { calculateYearDiff } from "@/helpers/date.helpers";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
interface DateInputPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string | undefined;
  setSelectedKeys?: React.Dispatch<React.SetStateAction<Date>> | undefined;
}
function DateInput({
  RowField,
  setTouched,
  defaultValue = "",
  setSelectedKeys,
}: DateInputPropsType) {
    const [date, setDate] = React.useState<Date>();
  return (
    <div className="flex items-end justify-start gap-[1rem]">
      <CalendarGeneric
        name={RowField?.name}
        required={RowField?.required}
        label={RowField?.name}
        allowFutureDates={RowField?.allowFutureDates}
        allowPreviousDates={RowField?.allowPreviousDates}
        setAction={() => setTouched && setTouched(true)}
        defaultValue={defaultValue != "" ? new Date(defaultValue) : undefined}
      />
      {RowField?.ExtraTxt && defaultValue && (
        <h1 className="text-semibold pb-3 text-base text-gray-15">
          {`${RowField?.ExtraTxt} ${RowField?.name == "Birth Date" && ": " + calculateYearDiff(defaultValue)}`}
        </h1>
      )}
     
    </div>
  );
}

export default memo(DateInput);
