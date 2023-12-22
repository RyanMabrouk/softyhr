import { Checkbox } from "@mui/material";
import React from "react";
export default function PrivacyPolicy({
  toggleDisplay,
}: {
  toggleDisplay: boolean;
}) {
  return (
    <div
      className={`col-span-2 flex flex-row items-start justify-start text-left text-[0.85rem] font-light leading-[18px] text-gray-10 ${
        toggleDisplay ? "hidden" : ""
      }`}
    >
      <Checkbox
        className="-mt-2"
        name="privacy_policy"
        color="success"
        required
      />
      <span>
        I authorize BambooHR to keep me informed about its products, services
        and events through emails and phone calls. My data will be handled
        according to the{" "}
        <span className="cursor-pointer text-color-green-5 underline">
          <strong>{"Privacy Policy"}</strong>
        </span>
        .
      </span>
    </div>
  );
}
