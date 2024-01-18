import React from "react";
import { TbNorthStar } from "react-icons/tb";
import { Switch } from "antd";

function AppQuestion() {
  return (
    <div>
      <Switch
        className=" !text-color-primary-8"
        checkedChildren={
          <TbNorthStar className="mt-[0.1rem] text-xl !text-white" />
        }
        unCheckedChildren={
          <TbNorthStar className="mt-[0.15rem] text-xl !text-white" />
        }
        defaultChecked
        onChange={(checked: boolean) => console.log(checked)}
      />
    </div>
  );
}

export default AppQuestion;
