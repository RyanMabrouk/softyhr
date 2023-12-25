import React from "react";
import { Checkbox } from "@mui/material";
export function TermsAndConditions() {
  return (
    <div className="col-span-2 -ml-6 -mt-3 flex flex-row items-center">
      <Checkbox name="agree_to_terms_and_conditions" color="success" required />
      <p>
        I agree to the <a href="#">terms and conditions</a>
      </p>
    </div>
  );
}
