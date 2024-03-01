import React, { useContext, useState } from "react";
import { TbNorthStar } from "react-icons/tb";
import { Switch } from "antd";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import SelectInput from "@/app/(dashboard)/people/components/Fileds/select/Select";
import { GovermentJobCategory } from "@/constants/Hiring/Hiring";
import { StepsContext } from "../../../add/context/StepsContext";
import useHiring from "@/hooks/Hiring/useHiring";
import { useSearchParams } from "next/navigation";
import { EditApplicationContext } from "../context/EditApplicationDetailsContext";

function AskGovermentJob() {
  const params = useSearchParams();
  const id = params?.get("id");
  const { Update_ApplicationDetails, ApplicationDetails } = useContext(
    EditApplicationContext);
  const {
    Hiring: { data: Hiring_data, isPending: Hiring_isPending },
  } = useHiring({ id });
  const [checked, setChecked] = useState<boolean>(
    Hiring_data?.[0]?.Application_Details?.GovermentContract ||
      ApplicationDetails?.values?.GovermentContract
      ? true
      : false,
  );
  return (
    <div className="flex flex-col items-start justify-start">
      <FormControlLabel
        className="!text-gray-11"
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              Update_ApplicationDetails({
                values: {
                  ...Hiring_data?.[0]?.Application_Details,
                  ...ApplicationDetails?.values,
                  GovermentContract: true,
                },
              });
            }}
            color="success"
          />
        }
        label={
          "My company is a government contractor or I'd like to capture applicant gender, ethnicity, disability, or veteran status."
        }
      />
      {checked && (
        <SelectInput
          label="-Select-"
          defaultValue={
            Hiring_data?.[0]?.Application_Details?.["Job Category"]
          }
          RowField={{
            name: "Job Category",
            type: "select",
            options: GovermentJobCategory,
            required: true,
          }}
        />
      )}
    </div>
  );
}
export default AskGovermentJob;
