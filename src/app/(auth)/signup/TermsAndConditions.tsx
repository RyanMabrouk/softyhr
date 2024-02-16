import React from "react";
import { Checkbox } from "@mui/material";
export function TermsAndConditions() {
  return (
    <div className="col-span-2 -ml-6 mb-4 flex flex-row items-center text-left text-[0.95rem] font-normal leading-[18px] text-gray-10">
      <Checkbox
        name="agree_to_terms_and_conditions"
        className="-mr-1"
        color="success"
        required
      />
      <p>
        I agree to the <a href="#">terms and conditions</a>
      </p>
    </div>
  );
}
