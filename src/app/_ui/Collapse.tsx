import { Collapse, IconButton } from "@mui/material";
import React, {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdCancel } from "react-icons/md";

interface CollapseDataProps {
  children: ReactNode;
  collapseTitle?: string;
  className?: string;
  defaultValue?: boolean;
  hasSelectedItems?: boolean;
  onResetHandler?: MouseEventHandler<HTMLButtonElement>;
}

const CustomCollapse: React.FC<CollapseDataProps> = ({
  children,
  collapseTitle,
  className,
  defaultValue,
  hasSelectedItems,
  onResetHandler,
}) => {
  const [open, setOpen] = useState(defaultValue || false);

  return (
    <>
      <div
        className={`flex cursor-pointer items-center justify-between ${className}`}
      >
        <div
          className={`flex cursor-pointer items-center`}
          onClick={() => setOpen(!open)}
        >
          <MdKeyboardArrowRight
            className={`width-[20px] transition-all ease-linear rotate-${open ? "90" : "0"} ${open || hasSelectedItems ? "text-fabric-700" : "text-black"}`}
          />
          {collapseTitle && (
            <p
              className={`text-sm ${open ? "text-color-primary-3" : ""} ${hasSelectedItems ? "font-medium	text-color-primary-3" : ""}`}
            >
              {collapseTitle}
            </p>
          )}
        </div>
        {onResetHandler && (
          <button type="reset" onClick={onResetHandler}>
            {hasSelectedItems && (
              <MdCancel className="w-[15px] text-gray-26 hover:text-gray-25" />
            )}
          </button>
        )}
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
export default CustomCollapse;
