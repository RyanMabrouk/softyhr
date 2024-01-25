import React, { ReactNode } from "react";
import { VscTriangleDown } from "react-icons/vsc";

export default function ItemsDropdownGeneric({
  label,
  name,
  required,
  defaultValue,
  items,
}: {
  name: string;
  label?: string;
  required?: boolean;
  defaultValue?: {
    value: string;
    label: ReactNode;
  };
  items?: {
    value: string;
    label: ReactNode;
  }[];
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(defaultValue?.value);
  const defaultItem = defaultValue ?? items?.[0];
  return (
    <div className="group flex w-fit flex-col gap-1">
      <input
        type="text"
        name={name}
        value={selected ?? defaultItem?.value}
        hidden
        readOnly
        autoFocus
      />
      <label htmlFor={label} className="relative w-fit text-sm text-gray-21">
        {label}
        {required && <span className="absolute -right-2 top-0 text-sm">*</span>}
      </label>
      <div
        role="button"
        className="relative flex cursor-pointer h-9 flex-row items-center justify-center gap-1 rounded-md border border-gray-18 px-1.5 py-0.5 shadow-sm transition-all ease-linear hover:shadow-md"
        onClick={() => setOpen((old) => !old)}
      >
        <span className="">
          {selected
            ? items?.find((e) => e.value === selected)?.label
            : defaultItem?.label}
        </span>
        <VscTriangleDown className="h-3 w-3 text-gray-25" />
        {open && (
          <div className="shadow-green absolute left-0 top-[120%] grid w-[15rem] grid-cols-6 grid-rows-3 items-center justify-center gap-1 border border-gray-14 bg-white p-2">
            {items?.map((e, i: number) => (
              <span
                role="button"
                onClick={() => setSelected(e.value)}
                key={"icon" + i}
              >
                <span className="flex cursor-pointer items-center justify-center border border-gray-25 hover:shadow-md">
                  {e.label}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
