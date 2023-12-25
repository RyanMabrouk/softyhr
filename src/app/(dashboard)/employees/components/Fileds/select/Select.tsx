"use client";
import React from "react";
import { Select } from "antd";

function SelectInput({ RowField }: any) {
  console.log(RowField);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="text-gray text-sm font-light ">{RowField?.name}</h1>
      <Select
        defaultValue={"-Sélectionner-"}
        style={{ width: 180, height: 33 }}
        onChange={handleChange}
        options={RowField?.options}
      />
    </div>
  );
}

export default SelectInput;
