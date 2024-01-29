import FilesSelectSettingsArrowDown from "@/app/(dashboard)/Files/_ui/components/FilesSelectSettingsArrowDown";
import React from "react";
import OrgChartSelect from "../components/OrgChartSelect";

export default function OrgChartHeader() {
  return (
    <div className="flex items-center justify-between">
      {/* <input
        type="text"
        placeholder="Jump to an employee..."
        // value={isTyping}
        // onChange={(e) => setIsTyping(e.target.value)}
        className=" w-80 border border-gray-4 px-2 py-1 outline-1 transition-all duration-300 placeholder:text-sm placeholder:text-gray-6 focus:outline-color1-300 "
      /> */}
      <div>
        {/* <OrgChartSelect
          options={[
            { value: "name", label: "Name" },
            { value: "photo", label: "Photo" },
            { value: "department", label: "Department" },
            { value: "location", label: "Location" },
            { value: "date", label: "Hire Date" },
          ]}
          // onSelect={handleSomething}
        /> */}
      </div>
    </div>
  );
}
