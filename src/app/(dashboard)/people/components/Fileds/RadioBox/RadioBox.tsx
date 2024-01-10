"use client";
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { ConfigProvider, Radio, Space } from "antd";

function RadioBox({ RowField, setTouched, user, champ }: any) {
  const [value, setValue] = useState(String(user[champ][RowField?.name || ""]));
  
  const onChange = (e: RadioChangeEvent) => {
    setTouched(true);
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-[0.5rem]">
      <h1 className="text-gray text-sm font-light ">{RowField?.name}</h1>
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
            {RowField?.options?.map((value: string, index: number) => (
              <Radio key={index} value={value}>
                {value}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </ConfigProvider>
    </div>
  );
}

export default RadioBox;
