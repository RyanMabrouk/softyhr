"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import { FaTrash } from "react-icons/fa6";
import Cropper from "react-easy-crop";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import CropEasy from "./cropImage";
import useData from "@/hooks/useData";
import Loader from "@/app/(dashboard)/people/components/Loader/Loader";
import useEmployeeData from "@/hooks/useEmloyeeData";

function EditPhoto() {
  const router = useRouter();
  const { employeeId } = useParams();

  const {
    employee_profile: { data, isPending },
  } = useEmployeeData({ employeeId });
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <PopUpSkeleton title="Modifier la photo">
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
