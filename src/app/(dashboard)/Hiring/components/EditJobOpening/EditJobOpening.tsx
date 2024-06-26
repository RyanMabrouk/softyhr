"use client";
import DropDownGeneric from "@/app/_ui/DropDownGeneric";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BsBriefcaseFill } from "react-icons/bs";
import {
  MdEventNote,
  MdModeEditOutline,
  MdOutlineEventNote,
} from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";

interface EditJobOpeningPropsType {
  text?: string;
  id?: string;
}
function EditJobOpening({ text, id }: EditJobOpeningPropsType) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="tooltip" data-tip={"edit job"}>
      <DropDownGeneric
        DropDownButton={() => (
          <div
            data-tip="edit job"
            className="tooltip flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center duration-200 ease-in-out hover:border hover:border-gray-27 hover:bg-gray-22"
          >
            <MdModeEditOutline
              className="text-lg"
              cursor={"pointer"}
              fill={"gray"}
            />
          </div>
        )}
        options={[
          {
            Component: () => (
              <div className="flex items-center justify-start gap-4">
                <BsBriefcaseFill className="text-lg !text-color-primary-7" />
                <h1 className="group-hover:text-white">
                  Edit Job Information...
                </h1>
              </div>
            ),
            link: {
              pathname: `/Hiring/jobs/edit/Information-Job`,
              query: {
                id: String(id),
              },
            },
          },
          {
            Component: () => (
              <div className="flex items-center justify-start gap-4">
                <MdEventNote className="text-lg !text-color-primary-7" />
                <h1 className="group-hover:text-white">
                  Edit Application Details...
                </h1>
              </div>
            ),
            link: {
              pathname: "/Hiring/jobs/edit/Application-Details",
              query: {
                id: String(id),
              },
            },
          },
          {
            Component: () => (
              <div className="flex items-center justify-start gap-4">
                <PiCertificateFill className="text-lg !text-color-primary-7" />
                <h1 className="group-hover:text-white">Manage Job Boards...</h1>
              </div>
            ),
            link: {
              pathname: "/Hiring/jobs/edit/Job-Boards",
              query: {
                id: String(id),
              },
            },
          },
        ]}
      />
    </div>
  );
}

export default EditJobOpening;
