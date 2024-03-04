import React from "react";

export default function FilesCheckBox({ isChecked, handleCheck }: any) {
  return (
    <input
      id="checked-checkbox"
      type="checkbox"
      checked={isChecked}
      onChange={handleCheck}
      className="  h-4 w-4 cursor-pointer rounded border-gray-300 border-r-color-primary-8 bg-gray-100  text-color-primary-8 accent-color-primary-8 "
    />
  );
}
