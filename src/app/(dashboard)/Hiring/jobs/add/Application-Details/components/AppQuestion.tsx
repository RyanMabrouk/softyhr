import React, { useContext, useState } from "react";
import { TbNorthStar } from "react-icons/tb";
import { Switch } from "antd";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { StepsContext } from "../../context/StepsContext";
interface AppQuestionPropsType {
  name: string;
  required: boolean;
  show: boolean;
  type: string;
}

function AppQuestion({ name, required, show, type }: AppQuestionPropsType) {
  const [checked, setChecked] = useState<boolean>(show);
  const { Update_ApplicationDetails, ApplicationDetails } =
    useContext(StepsContext);
  return (
    <div className="w-full">
      <FormControlLabel
        control={
          <div className="flex items-center justify-center">
            <Checkbox
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
                Update_ApplicationDetails({
                  values: {
                    ...ApplicationDetails?.values,
                      [name]: {
                        ...ApplicationDetails?.values?.[name],
                        AddToAppliement: e.target.checked,
                        type,
                      },
                  },
                });
              }}
              color="success"
            />
            <h1 className="text-[15px] text-gray-23">{name}</h1>
          </div>
        }
        label=""
      />
      {checked && (
        <Switch
          className="bg-gray-15 !text-color-primary-8 duration-200 ease-in-out"
          checkedChildren={
            <TbNorthStar className="mt-[0.09rem] text-sm !text-white" />
          }
          unCheckedChildren={
            <TbNorthStar className="mt-[0.09rem] text-sm !text-white" />
          }
          size="small"
          defaultValue={required}
          onChange={(checked) => {
            Update_ApplicationDetails({
              values: {
                ...ApplicationDetails?.values,
                [name]: {
                  ...ApplicationDetails?.values?.[name],
                  required: checked,
                  type,
                },
              },
            });
          }}
        />
      )}
    </div>
  );
}

export default AppQuestion;
