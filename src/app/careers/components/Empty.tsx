import React from "react";
import { TbNotesOff } from "react-icons/tb";

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center gap-[1rem]">
      <TbNotesOff className="text-[9rem] text-gray-15" />
      <h1 className="text-gray-34 text-lg font-bold">
        Thank you for your interest. Unfortunately, we are not hiring at this
        time.
      </h1>
      <p className="text-gray-33 w-[35rem] text-center">
        Please check back as we will most certainly be looking for great people
        to join our team in the future.
      </p>
    </div>
  );
}

export default Empty;
