import React from "react";
import FiledsChamps from "@/app/(dashboard)/people/components/Fileds/Fileds";
import { FaAddressCard } from "react-icons/fa6";
import { RowFieldType, RowType } from "@/types/database.tables.types";

function EmployementStatus() {
  const Fields: RowType[] = [
    {
      Row: [
        {
          name: "Employment Status",
          type: "select",
          required: true,
          options: [
            {
              label: "Full-Time",
              value: "Full-Time",
            },
            {
              label: "Part-Time",
              value: "Part-Time",
            },
          ],
        },
      ],
      rang: 1,
    },
  ];
  return (
    <div className="mt-4 flex w-full flex-col place-items-start justify-center gap-[2rem] border-b border-gray-18 pb-8">
      <h1 className="font-lg flex items-center justify-center gap-[0.5rem] text-xl  text-black">
        <FaAddressCard className="text-fabric-700" />
        Employement Status
      </h1>
      <div className="flex flex-col items-start justify-center gap-[1rem]">
        {<FiledsChamps champ="Employement Status" FieldsArray={Fields} />}
      </div>
    </div>
  );
}

export default EmployementStatus;
