import React, { ChangeEvent } from "react";

type CheckboxType = {
  label: string;
  name: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
};

function Checkbox({ label, name, checked, onChange }: CheckboxType) {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onChange(isChecked);
  };
  return (
    <div className="mx-2 my-1  flex items-center gap-2 ">
      <input
        id={`checked-checkbox-${name}`}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleCheckboxChange}
        className="  h-4 w-4 cursor-pointer rounded border-gray-300 border-r-color-primary-8 bg-gray-100  text-color-primary-8 accent-color-primary-8 "
      />
      <label
        htmlFor={`checked-checkbox-${name}`}
        className="cursor-pointer text-sm text-gray-11"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
