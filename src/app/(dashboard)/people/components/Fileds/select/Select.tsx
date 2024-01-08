"use client";
import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { RowFieldType } from "@/types/userInfoTypes.type";

interface SelectInputPropsType {
  RowField: RowFieldType;
  setTouched?: (arg: boolean) => void | undefined;
  defaultValue: string;
}

function SelectInput({
  RowField,
  setTouched,
  defaultValue,
}: SelectInputPropsType) {
  const [value, setValue] = useState(String(defaultValue));
  console.log(RowField?.name, value);
  const HandleChange = (e: any) => {
    if (setTouched) setTouched(true);
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-start justify-center">
      <h1
        className={
          "text-gray text-sm font-light " +
          (RowField?.required ? " after:text-red after:content-['*']" : "")
        }
      >
        {RowField?.name}
      </h1>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        sx={{
          border: "1px solid #D9D9D9",
          color: "black",
          ".MuiSvgIcon-root ": {
            fill: "#D9D9D9 !important",
          },
          height: "2rem",
          minWidth: "9rem",
          borderRadius: "0.1rem !important",
          fontWeight: "300",
          fontSize: "1rem",
        }}
        name={RowField?.name}
        defaultValue={value}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        onChange={HandleChange}
        className="[&_.MuiOutlinedInput-notchedOutline]:border-none"
      >
        {RowField?.options?.map((element: any, index: number) => {
          return (
            <MenuItem
              value={element?.label || element?.name}
              className="p-1"
              key={index}
              sx={{ fontWeight: "300", fontSize: "1rem" }}
            >
              {element?.label || element?.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}

export default SelectInput;

/*<div className="flex flex-col items-start justify-center">
      <h1 className="text-gray text-sm font-light ">{RowField?.name}</h1>
      <Select
        defaultValue={"-Sélectionner-"}
        style={{ minWidth: 280, height: 33 }}
        onChange={handleChange}
        options={items}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: "8px 0" }} />
            <Space>
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={Name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="text" onClick={addItem}>
                + Ajoutée un element
              </Button>
            </Space>
          </>
        )}
      />
        </div>*/
