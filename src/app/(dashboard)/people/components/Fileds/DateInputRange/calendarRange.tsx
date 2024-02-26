"use client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import React from "react";
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
import { useEffect, useState } from "react";
import { InvalidDate, formatYYYYMMDD } from "@/helpers/date.helpers";
interface CalendarProps {
  endDateName: string;
  startDateName: string;
  className?: string;
  label: string;
  defaultValue?: DateRange | undefined;
  required?: boolean;
  setAction?: React.Dispatch<React.SetStateAction<Date>> | undefined;
  setStartValueInParent?:
    | React.Dispatch<React.SetStateAction<Date | null>>
    | undefined;
  setEndValueInParent?:
    | React.Dispatch<React.SetStateAction<Date | null>>
    | undefined;
  DataType?: string | undefined;
  numberOfMonths?: number | null;
}
export function CalendarRange({
  className,
  endDateName,
  startDateName,
  label,
  defaultValue,
  required,
  setAction,
  DataType = "date",
  numberOfMonths,
}: CalendarProps) {
    console.log(
      "calendar_range",
      endDateName,
      startDateName,
      label,
      defaultValue,
    );
  const [date, setDate] = useState<DateRange | undefined>(defaultValue);
  if (defaultValue && !date?.from && !date?.to) setDate(defaultValue);
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="date_range"
        className={`relative w-fit text-sm 
        text-gray-21
        `}
      >
        {label}
        {required && <span className="absolute -right-2 top-0 text-sm">*</span>}
      </label>
      <div
        className={cn(
          `group grid w-fit gap-2 rounded-sm border  
                focus-within:shadow-green border-gray-18"
          }`,
          className,
        )}
      >
        <input
          type={DataType}
          hidden
          autoFocus
          readOnly
          value={date?.from ? formatYYYYMMDD(date.from) : ""}
          name={startDateName}
          required={required}
        />
        <input
          type={DataType}
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
                "w-[15rem] justify-start border border-transparent text-center !text-[0.95rem] !font-normal !text-gray-13 ",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon
                className={`-ml-1 mr-2 h-5 w-5 group-focus-within:text-fabric-700 `}
              />
              <div className="">
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
              onDayClick={setAction}
              mode="range"
              fromYear={1980}
              toYear={2060}
              defaultMonth={date?.from ?? defaultValue?.from ?? new Date()}
              selected={date}
              onSelect={setDate}
              {...(numberOfMonths != null ? { numberOfMonths: 2 } : {})}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
