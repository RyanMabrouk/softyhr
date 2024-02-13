"use client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { formatYYYYMMDD } from "@/helpers/date.helpers";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Label } from "./InputGeneric";
export function CalendarGeneric({
  className,
  name,
  label,
  defaultValue,
  error,
  setValueInParent,
  allowPastDates = false, // allow dates in the future
  allowPreviousDates = true, // allow dates in the past
  required,
  setAction,
}: {
  className?: string;
  name: string;
  label: string;
  defaultValue?: Date | undefined;
  error?: boolean;
  setValueInParent?: React.Dispatch<React.SetStateAction<Date>> | undefined;
  allowPastDates?: boolean;
  allowPreviousDates?: boolean;
  required?: boolean;
  setAction?: React.Dispatch<React.SetStateAction<Date>> | undefined;
}) {
  const [date, setDate] = useState<Date | undefined>(defaultValue);
  useEffect(() => {
    setValueInParent && date ? setValueInParent(new Date(date)) : null;
  }, [date, setValueInParent]);
  return (
    <div className="flex flex-col gap-1">
      <Label name={name} required={required} error={error}>
        {label}
      </Label>
      <div
        className={cn(
          `group grid w-fit gap-2 rounded-sm border  ${
            error
              ? " border-color9-500"
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
          value={date ? formatYYYYMMDD(date) : ""}
          name={name}
          required={required}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[15rem] justify-start border border-transparent text-center font-normal ",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon
                className={`-ml-1 mr-2 h-5 w-5  ${error ? "!text-color9-500" : "group-focus-within:text-fabric-700"}`}
              />
              <div className={`${error ? "text-color9-500" : ""}`}>
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              id="date"
              mode="single"
              defaultMonth={date}
              selected={date}
              onSelect={setDate}
              onDayClick={setAction}
              disabled={(date) =>
                allowPastDates
                  ? allowPreviousDates
                    ? date < new Date()
                    : false
                  : allowPreviousDates
                    ? date > new Date() && date < new Date()
                    : date > new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
