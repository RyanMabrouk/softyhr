"use client";
import React from "react";
import { DayPicker, DropdownProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FaSortDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months:
          "flex flex-row items-start sm:flex-row space-x-4  sm:space-x-4 ",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        caption_dropdowns: "flex justify-center gap-1",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-white first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-fabric-700 text-white hover:bg-fabric-700 hover:text-color-primary-0 focus:bg-fabric-700 focus:text-white",
        day_today: "bg-accent text-black",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-color-primary-0  aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
          const options = React.Children.toArray(
            children,
          ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
          const selected = options.find((child) => child.props.value === value);
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Dropdown>
              <DropdownTrigger className=" px-1 shadow-sm focus:ring-0">
                <Button
                  size="sm"
                  className="flex items-center justify-end gap-2"
                >
                  <div className="">{selected?.props?.children}</div>
                  <FaSortDown fill="gray" className="-mt-1" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className=" flex !max-h-[20rem] flex-row overflow-auto rounded-lg !bg-white shadow-lg">
                {options.map((option, id: number) => (
                  <DropdownItem
                    onClick={() =>
                      handleChange(option.props.value?.toString() || "")
                    }
                    key={`${option.props.value}-${id}`}
                    value={option.props.value?.toString() ?? ""}
                  >
                    {option.props.children}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          );
        },
        IconLeft: ({ ...props }) => (
          <MdKeyboardArrowRight className="h-5 w-5 rotate-180" />
        ),
        IconRight: ({ ...props }) => (
          <MdKeyboardArrowRight className="h-5 w-5" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
