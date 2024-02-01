"use client";
import React from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import CropEasy from "./cropImage";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import useEmployeeData from "@/hooks/useEmloyeeData";

function EditPhoto() {
  const { employeeId } = useParams();
  const {
    employee_profile: { data, isPending },
  } = useEmployeeData({ employeeId });
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <PopUpSkeleton title="Modifier la photo" className="flex flex-col">
          <div className="judtify-center flex min-w-[40rem] flex-col items-center gap-[1rem] px-6 py-6">
            <div className="flex flex-col items-center justify-center gap-[2rem]">
              <CropEasy user_id={data?.user_id} alt={""} URL={data?.picture} />
            </div>
          </div>
        </PopUpSkeleton>
      )}
    </>
  );
}

export default EditPhoto;
