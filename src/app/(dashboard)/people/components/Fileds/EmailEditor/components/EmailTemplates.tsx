"use client";
import React from "react";
import SelectInput from "../../select/Select";

function EmailTemplates({ setValue }: any) {

  return (
    <SelectInput
      setSelectedKeys={setValue}
      RowField={{
        name: "Email Templates",
        options: [
          { label: "template 1", value: "<h1>template 1</h1>" },
          { label: "template 1", value: "<h1>template 1</h1>" },
          { label: "template 1", value: "<h1>template 1</h1>" },
        ],
      }}
    />
  );
}

export default EmailTemplates;
