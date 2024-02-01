"use client";
import { deleteEducation } from "@/actions/personal-job/education/deleteEducation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useParams } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import PopUpSkeleton from "../../../PopUpSkeleton";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { Button } from "@/app/_ui/Button";

interface DeleteEducationFnType {
  id: string | null;
  data: any;
  user_id: string;
}

function DeleteEducation() {
  const Router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { employeeId } = useParams();
  const { employee_profile: data } = useEmployeeData({ employeeId });
  const params = useSearchParams();
  const id = params?.get("id");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ id, data, user_id }: DeleteEducationFnType) => {
      const NewEducation = data?.filter(
        (education: any) => education?.id != id,
      );
      return await deleteEducation(NewEducation, user_id);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["profiles", employeeId] });
      toast.success("Education deleted successfully", "Deleted");
      Router.push(pathname);
    },
    onError: () => {
      toast.error("something went wrong");
      Router.push(pathname);
    },
  });
  return (
    <>
      <PopUpSkeleton
        className=" flex flex-col items-center gap-[2rem] px-4 py-6"
        title="Delete Education"
      >
        <div className="flex flex-col items-center justify-center gap-[2rem]">
          <FaRegTrashAlt className="text-6xl text-color9-500" />
          <div className="flex flex-col items-center justify-center gap-[0.3rem]">
            <h1 className="whitespace-nowrap text-lg text-gray-15">
              Are you sure you want to{" "}
              <strong className="text-black">
                delete this education record?
              </strong>
            </h1>
            <h1 className="w-10/12 text-center text-xl text-gray-15">
              Don't worry, doing so won't actually make the employee any less
              educated
            </h1>
          </div>
        </div>
        <hr className="h-[3px] w-full bg-primary-gradient" />
        <div className="flex items-center justify-start gap-[1rem] self-start ">
          <Button
            className="!px-4"
            disabled={isPending}
            onClick={() => {
              mutateAsync({
                id: id,
                data: data?.data["Education"],
                user_id: data?.data?.user_id,
              });
            }}
          >
            yes, delete education
          </Button>
          <CancelBtnGeneric />
        </div>
      </PopUpSkeleton>
    </>
  );
}

export default DeleteEducation;
