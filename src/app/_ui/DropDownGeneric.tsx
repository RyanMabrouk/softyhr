import React, { ReactNode } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

interface DropDownGenericOption {
  link?: any;
  actions?: () => void;
  Component: () => React.JSX.Element;
}
interface DropDownGenericPropsTYpe {
  options: DropDownGenericOption[];
  DropDownButton: any;
}

function DropDownGeneric({
  options,
  DropDownButton,
}: DropDownGenericPropsTYpe) {
  return (
    <Dropdown className="flex flex-col items-center justify-center">
      <DropdownTrigger>
        <Button
          className={`flex h-full  items-center justify-start gap-2`}
          variant="bordered"
        >
          <DropDownButton />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        className="flex w-full flex-col items-start justify-center rounded-md border border-gray-15 bg-white !p-0 shadow-md"
        aria-label="Dropdown menu with icons"
      >
        {options?.map(({ link, Component, action }: any, index: number) => {
          const ComponentWrapper = link
            ? () => (
                <div className="hover:bg-color-primary-6(§è(è§( w-full px-2 duration-200 ease-linear">
                  <Link href={link} className="">
                    <Component />
                  </Link>
                </div>
              )
            : () => (
                <h1 className="w-full px-2 duration-200 ease-linear hover:bg-color-primary-6">
                  <Component />
                </h1>
              );

          return (
            <DropdownItem
              className="duration-250 group flex w-full ease-linear hover:bg-color-primary-8"
              key={index}
              onClick={action && action}
            >
              <ComponentWrapper />
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDownGeneric;
