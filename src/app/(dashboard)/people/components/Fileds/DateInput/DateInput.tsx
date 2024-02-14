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
        label={RowField?.name}
        allowPastDates={RowField?.allowPastDates}
        allowPreviousDates={RowField?.allowPreviousDates}
        setAction={() => setTouched && setTouched(true)}
        defaultValue={defaultValue != "" ? new Date(defaultValue) : undefined}
      />
      {RowField?.ExtraTxt && defaultValue && (
        <h1 className="text-semibold pb-3 text-base text-gray-15">
          {`${RowField?.ExtraTxt} ${RowField?.name == "Birth Date" && ": " + calculateYearDiff(defaultValue)}`}
        </h1>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className=" w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={date}
            onSelect={setDate}
            fromYear={1960}
            toYear={2030}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default memo(DateInput);
