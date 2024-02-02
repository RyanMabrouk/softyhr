"use client";
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { ConfigProvider, Radio, Space } from "antd";
import { RowFieldType } from "@/types/database.tables.types";

interface RadioBoxPropsType {
  RowField: RowFieldType;
  setTouched?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  defaultValue?: string;
  user?:any;
  champ:string;
}

function RadioBox({ RowField, setTouched, user, champ }: RadioBoxPropsType) {
  const [value, setValue] = useState(
    String(user?.[champ]?.[RowField?.name || ""]),
  );

  const onChange = (e: RadioChangeEvent) => {
    setTouched && setTouched(true);
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-[0.5rem]">
      <h1 className="text-[14px] text-gray-29 ">{RowField?.name}</h1>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
            borderRadius: 2,
            colorBgContainer: "#f6ffed",
            fontSize: 14,
            controlOutline: "",
          },
        }}
      >
        <Radio.Group onChange={onChange} value={value} name={RowField?.name}>
          <Space direction="vertical">
            {RowField?.options?.map(
              (value: any, index: number) => (
                <Radio key={index} value={value}>
                  {value}
                </Radio>
              ),
            )}
          </Space>
        </Radio.Group>
      </ConfigProvider>
    </div>
  );
}

export default RadioBox;
