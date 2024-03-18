import { Collapse, IconButton } from "@mui/material";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface CollapseDataProps {
  children: ReactNode;
  collapseTitle?: string;
  className?: string;
  defaultValue?: boolean;
}

const CustomCollapse: React.FC<CollapseDataProps> = ({
  children,
  collapseTitle,
  className,
  defaultValue,
}) => {
  const [open, setOpen] = useState(defaultValue || false);

  return (
    <>
      <div
        className={`flex cursor-pointer  items-center  ${className}`}
        onClick={() => setOpen(!open)}
      >
        <div>
          <KeyboardArrowRightIcon
            sx={{
              width: 20,
              rotate: open ? "90deg" : "0deg",
              color: open ? "#599D15" : "black",
              transition: ".3s ease",
            }}
          />
        </div>
        {collapseTitle && (
          <p
            className={`text-sm ${open ? "font-normal	text-color-primary-3" : ""}`}
          >
            {collapseTitle}
          </p>
        )}
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
export default CustomCollapse;
