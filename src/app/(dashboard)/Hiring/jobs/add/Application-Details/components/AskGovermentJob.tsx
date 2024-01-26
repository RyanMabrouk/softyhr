import React, { useContext, useState } from "react";
import { TbNorthStar } from "react-icons/tb";
import { Switch } from "antd";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { StepsContext } from "../../context/StepsProvider";
import SelectInput from "@/app/(dashboard)/people/components/Fileds/select/Select";
import { GovermentJobCategory } from "@/constants/Hiring";

function AskGovermentJob() {
  const { Update_ApplicationDetails, ApplicationDetails } =
    useContext(StepsContext);
  const [checked, setChecked] = useState<boolean>(
    ApplicationDetails?.values?.["Job Category"] ? true : false,
  );
  return (
    <div>
      <FormControlLabel
        className="!text-gray-11"
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              Update_ApplicationDetails({
                values: {
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
          minWidth="19rem"
          label="-Select-"
          defaultValue={ApplicationDetails?.values?.["Job Category"]}
          RowField={{
            name: "Job Category",
            options: GovermentJobCategory,
            required: true,
          }}
        />
      )}
    </div>
  );
}
export default AskGovermentJob;
