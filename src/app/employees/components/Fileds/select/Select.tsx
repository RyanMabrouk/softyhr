"use client";
import { MenuItem, Select } from "@mui/material";
import React, { useRef, useState } from "react";
import DropDown from "../../DropDown/DropDown";
import { RowFieldType } from "@/app/types/userInfoTypes.type";



interface SelectInputPropsType {
  RowField: RowFieldType;
  setTouched: (arg: boolean) => void;
}

function SelectInput({ RowField, setTouched }: SelectInputPropsType) {
  const [value, setValue] = useState("");

  const HandleChange = (e: any) => {
    setTouched(true);
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
          fontWeight: "300",
          fontSize: "1rem",
        }}
        name={RowField?.name}
        label={"-Sélectionner-"}
        displayEmpty
        onChange={HandleChange}
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
