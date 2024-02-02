"use client";
import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { BsBriefcaseFill } from "react-icons/bs";
import { MdEventNote, MdOutlineEventNote } from "react-icons/md";
import { PiCertificateFill, PiCertificateLight } from "react-icons/pi";
import { VscTriangleDown } from "react-icons/vsc";

interface EditJobOpeningPropsType {
  text?: string;
  id?: string;
}
function EditJobOpening({  text, id }: EditJobOpeningPropsType) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <MenuLinksGeneric
      setOpenValueInParent={setOpen}
      id="Edit_JobOpening"
      options={[
        {
          name: (
            <div className="flex items-center justify-center gap-4">
              <BsBriefcaseFill className="text-lg !text-color-primary-7" />
              <h1>Edit Job Information...</h1>
            </div>
          ),
          link: {
            pathname: `/Hiring/jobs/edit/Information-Job`,
            query: {
             id: String(id)
            },
          },
        },
        {
          name: (
            <div className="flex items-center justify-center gap-4">
              <MdEventNote className="text-lg !text-color-primary-7" />
              <h1>Edit Application Details...</h1>
            </div>
          ),
          link: {
            pathname: pathname,
            query: {
              popup: "EDIT_APPLICATION_DETAILS",
            },
          },
        },
        {
          name: (
            <div className="flex items-center justify-center gap-4">
              <PiCertificateFill className="text-lg !text-color-primary-7" />
              <h1>Manage Job Boards...</h1>
            </div>
          ),
          link: {
            pathname: pathname,
            query: {
              popup: "EDIT_JOB_BOARDS",
            },
          },
        },
      ]}
    >
      <div
        id="timeoff_settings"
        className="flex cursor-pointer flex-row items-center justify-center gap-1 border border-color-primary-8 px-2 py-1.5 transition-all ease-linear hover:shadow-md"
      >
        <h1>{text}</h1>
        <VscTriangleDown
          className={`h-3 w-3 text-gray-25 ${open ? " rotate-180 duration-300 ease-linear" : ""} `}
        />
      </div>
    </MenuLinksGeneric>
  );
}

export default EditJobOpening;
