"use client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams } from "next/navigation";
import { useAlreadyBooked } from "../hooks/useAlreadyBooked";
import { InvalidDate, formatYYYYMMDD } from "@/helpers/date.helpers";
import { useEffect, useState } from "react";
interface CalendarProps {
  endDateName: string;
  startDateName: string;
  className?: string;
  label: string;
  defaultValue?: DateRange | undefined;
  required?: boolean;
  setStartValueInParent?:
    | React.Dispatch<React.SetStateAction<Date>>
    | undefined;
  setEndValueInParent?: React.Dispatch<React.SetStateAction<Date>> | undefined;
}
export function CalendarRange({
  className,
  endDateName,
  startDateName,
  label,
  defaultValue,
  setStartValueInParent,
  setEndValueInParent,
  required,
}: CalendarProps) {
  const [date, setDate] = useState<DateRange | undefined>(defaultValue);
  // Sync the default value with the date
  if (defaultValue && !date?.from && !date?.to) setDate(defaultValue);
  // Sync the date with the parent
  useEffect(() => {
    setStartValueInParent && date?.from
      ? setStartValueInParent(new Date(date?.from))
      : null;
    setEndValueInParent && date?.to
      ? setEndValueInParent(new Date(date?.to))
      : null;
  }, [date, setStartValueInParent, setEndValueInParent]);
  const { employeeId } = useParams();
  const already_booked = useAlreadyBooked(employeeId);
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="date_range"
        className={`relative w-fit text-sm ${
          already_booked ? "text-color9-500" : "text-gray-21"
        }`}
      >
        {label}
        {required && <span className="absolute -right-2 top-0 text-sm">*</span>}
      </label>
      <div
        className={cn(
          `group grid w-fit gap-2 rounded-sm border  ${
            already_booked
              ? "border-color9-500"
              : " focus-within:shadow-green border-gray-18"
          }`,
          className,
        )}
      >
        <input
          type="date"
          hidden
          autoFocus
          readOnly
          value={date?.from ? formatYYYYMMDD(date.from) : ""}
          name={startDateName}
          required={required}
        />
        <input
          type="date"
          hidden
          autoFocus
          readOnly
          value={date?.to ? formatYYYYMMDD(date.to) : ""}
          name={endDateName}
          required={required}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[15rem] justify-start border border-transparent text-center font-normal ",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon
                className={`-ml-1 mr-2 h-5 w-5  ${already_booked ? "!text-color9-500" : "group-focus-within:text-fabric-700"}`}
              />
              <div className={`${already_booked ? "text-color9-500" : ""}`}>
                {date?.from && !InvalidDate(date?.from) ? (
                  date?.to && !InvalidDate(date?.to) ? (
                    <>
                      {format(date?.from, "LLL dd, y")} -{" "}
                      {format(date?.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              id="date_range"
              initialFocus
              mode="range"
              defaultMonth={defaultValue?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
