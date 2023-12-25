import React from "react";
import { v4 as uuidv4 } from "uuid";

function Input({ RowField }: any) {
  console.log("rendred");
  return (
    <div className="flex flex-col items-start justify-center" key={uuidv4()}>
      <h1
        className={
          "text-gray text-sm font-light " +
          (RowField?.required ? " after:content-['*']" : "")
        }
      >
        {RowField?.name}
      </h1>
      <input
        className="h-[2rem] rounded border border-gray-19 pl-2 outline-none"
        type={RowField?.type || "text"}
        name={RowField?.name}
      />
    </div>
  );
}

export default Input;
