import React, { useEffect } from "react";
import { Select, Space } from "antd";
type Option = {
  value: string;
  label: string;
};
export function FilterSelect({
  options,
  setValueInParent,
  initialValue,
}: {
  options: Option[];
  setValueInParent?: React.Dispatch<React.SetStateAction<string>> | undefined;
  initialValue?: number;
}) {
  const defaultValue = initialValue
    ? initialValue < options.length
      ? options[initialValue].value
      : options?.length > 2
        ? options[1].value
        : options[0].value
    : options[0].value;
  useEffect(() => {
    initialValue && setValueInParent ? setValueInParent(defaultValue) : null;
  }, [defaultValue, setValueInParent, initialValue]);
  return (
    <Space wrap>
      <Select
        data-placeholder-trigger="keydown"
        id="demo-simple-select-error"
        defaultValue={defaultValue}
        onChange={(value) =>
          setValueInParent ? setValueInParent(value.toString()) : null
        }
        className={`group h-9 w-[12.5rem] rounded-md border border-gray-400 text-gray-400 hover:border-gray-600  focus:border-transparent  focus:outline-none focus:ring-2 focus:ring-color-primary-5 group-focus-within:text-color-primary-5 [&_.ant-select-selection]:bg-color-primary-focus [&_.ant-select-selector]:!border-transparent`}
        options={options}
      />
    </Space>
  );
}
