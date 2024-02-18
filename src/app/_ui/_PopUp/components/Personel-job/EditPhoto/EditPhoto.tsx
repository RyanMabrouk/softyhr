"use client";
import React from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import { useParams } from "next/navigation";
import CropEasy from "./cropImage";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import useEmployeeData from "@/hooks/useEmloyeeData";

function EditPhoto() {
  const { employeeId } = useParams();
  const {
    employee_profile: { data, isPending },
  } = useEmployeeData({ employeeId: String(employeeId) });
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <PopUpSkeleton
          title="Modify your image"
          className="flex min-w-[40rem] flex-col items-center justify-center gap-[2rem] px-6 py-6"
        >
          <CropEasy user_id={data?.user_id} alt={""} URL={data?.picture} />
        </PopUpSkeleton>
      )}
    </>
  );
}

export default EditPhoto;
