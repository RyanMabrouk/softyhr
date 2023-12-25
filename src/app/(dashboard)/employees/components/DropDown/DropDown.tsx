import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  createStyles,
  makeStyles,
} from "@mui/material";
import React from "react";

interface DropdownpropsType {
  text: string;
  ListArray: any;
}

function DropDown({ text, ListArray }: DropdownpropsType) {
  return (
    <Select
      sx={{
        border: "1px solid white",
        color: "white",
        ".MuiSvgIcon-root ": {
          fill: "white !important",
        },
      }}
      value={text}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
    >
      <MenuItem disabled sx={{}} value={text} className="p-1">
        {text}
      </MenuItem>
      {ListArray?.map((element: any, index: number) => {
        return (
          <MenuItem
            value={element?.label || element?.name}
            className="p-1"
            key={index}
          >
            {element?.label || element?.name}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default DropDown;
