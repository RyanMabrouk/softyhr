"use client";
import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
export function RadioGroupBtns({
  name,
  options,
  defaultValue,
  extra,
  setValueInParent,
}: {
  name: string;
  extra?: React.ReactNode;
  options: { label: string; value: string }[];
  defaultValue?: { label: string; value: string };
  setValueInParent?: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [value, setValue] = React.useState(defaultValue?.value);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setValueInParent &&
      setValueInParent((event.target as HTMLInputElement).value);
  };
  return (
    <>
      <RadioGroup
        aria-labelledby={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((e) => (
          <FormControlLabel
            key={e.value + e.label}
            className={`-mb-3 font-semibold leading-3 [&_.MuiFormControlLabel-label]:!text-[0.95rem] ${value === e.value ? "text-gray-27" : "text-gray-21"}`}
            value={e.value}
            control={
              <Radio
                size="small"
                sx={{
                  "&, &.Mui-checked": {
                    color: "#527a00",
                  },
                }}
              />
            }
            label={e.label}
          />
        ))}
      </RadioGroup>
      {value && extra}
    </>
  );
}
