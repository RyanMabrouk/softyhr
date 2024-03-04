import React, { useContext, useState } from "react";
import { TbNorthStar } from "react-icons/tb";
import { Switch } from "antd";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { StepsContext } from "../../../add/context/StepsContext";
import useHiring from "@/hooks/Hiring/useHiring";
import { useSearchParams } from "next/navigation";
import { EditApplicationContext } from "../context/EditApplicationDetailsContext";
interface AppQuestionPropsType {
  name: string;
  required: boolean;
  show: boolean;
  type: string;
}

function AppQuestion({ name, required, show, type }: AppQuestionPropsType) {
  const [checked, setChecked] = useState<boolean>(show);
  const params = useSearchParams();
  const id = params?.get("id");
  const {
    Hiring: { data: Hiring_data, isPending: Hiring_isPending },
  } = useHiring({ id });
  const { Update_ApplicationDetails, ApplicationDetails } = useContext(
    EditApplicationContext);
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
                    ...Hiring_data?.[0]?.Application_Details,
                    ...ApplicationDetails?.values,
                    [name]: {
                      ...Hiring_data?.[0]?.Application_Details?.[name],
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
                ...Hiring_data?.[0]?.Application_Details,
                ...ApplicationDetails?.values,
                [name]: {
                  ...Hiring_data?.[0]?.Application_Details?.[name],
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
