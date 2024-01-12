"use client";
import { deleteEducation } from "@/actions/education/deleteEducation";
import useEmployeeData from "@/hooks/useEmloyeeData";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { CgClose } from "react-icons/cg";
import { useParams } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import PopUpSkeleton from "../../PopUpSkeleton";

interface DeleteEducationFnType {
  id: string | null;
  data: any;
  user_id: string;
}

function DeleteEducation() {
  const Router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { toast, toastContainer } = useToast();
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
      {toastContainer}
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
        <div className="h-[0.1rem] w-full bg-color-primary-8" />
        <div className="flex items-center justify-start gap-[1rem] self-start ">
          <button
            onClick={() => {
              mutateAsync({
                id: id,
                data: data?.data["Education"],
                user_id: data?.data?.user_id,
              });
            }}
            className="rounded-sm bg-color-primary-9 p-2 capitalize text-white duration-150 ease-in-out hover:bg-color-primary-10"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-[0.3rem]">
                <span className="box-border inline-block h-5 w-5 animate-[spin_1s_linear_infinite] rounded-[50%] border-[3px] border-solid border-white border-b-transparent"></span>
                Deleting...
              </div>
            ) : (
              "yes, delete education"
            )}
          </button>
          <button
            onClick={() => Router.push(pathname)}
            className="capitalize text-color5-500 duration-150 ease-in-out hover:text-color1-500 hover:underline"
          >
            cancel
          </button>
        </div>
      </PopUpSkeleton>
    </>
  );
}

export default DeleteEducation;
