import { Collapse, IconButton } from "@mui/material";
import React, {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";
import Image from "next/image";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CancelIcon from "@mui/icons-material/Cancel";

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
          <KeyboardArrowRightIcon
            sx={{
              width: 20,
              rotate: open ? "90deg" : "0deg",
              color: open || hasSelectedItems ? "#599D15" : "black",
              transition: ".3s ease",
            }}
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
              <CancelIcon
                sx={{
                  width: 15,
                  color: "#999",
                  "&:hover": {
                    color: "#555",
                  },
                }}
              />
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
