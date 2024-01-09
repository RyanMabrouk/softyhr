"use client";
import useData from "@/hooks/useData";
import {
  database_leave_requests_type,
  database_profile_type,
} from "@/types/database.tables.types";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { CgClose } from "react-icons/cg";
import default_avatar from "/public/default_avatar.jpeg";
import { Hr } from "@/app/(dashboard)/people/[employeeId]/TimeOff/_ui/Hr";
import cancelLeaveRequest from "@/actions/leave/cancelLeaveRequest";
import { SubmitBtn } from "@/app/(auth)/login/_ui/SubmitBtn";
import updateLeaveRequest from "@/actions/leave/updateLeaveRequest";
import DateRangeContextProvider from "./context/dateRangeContext";
import { FormInputs } from "./components/FormInputs";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import insertLeaveRequest from "@/actions/leave/insertLeaveRequest";
export type Option = {
  value: string;
  label: string;
};
export type default_duration_type = {
  date: string;
  duration: string;
};
export default function EditLeaveRequest() {
  const { toast, toastContainer } = useToast();
  const Router = useRouter();
  const { employeeId } = useParams();
  const searchParams = useSearchParams();
  const leave_request_id = Number(searchParams.get("leave_request_id"));
  const {
    all_profiles: { data: all_profiles, isPending: isPending },
    leave_requests: { data: leave_requests, isPending: isPending2 },
    user_profile: { data: user_profile, isPending: isPending3 },
  } = useData();
  // User Profile Data
  const current_user_profile = all_profiles?.find(
    (profile: database_profile_type) => profile.user_id == employeeId,
  );
  // Current User Data
  const full_name: string =
    current_user_profile?.["Basic Information"]?.["First name"] +
    " " +
    current_user_profile?.["Basic Information"]?.["Last name"];
  const job_title: string =
    (current_user_profile?.["Job Information"]?.sort(
      (a: any, b: any) =>
        new Date(b["Effective Date"]).getTime() -
        new Date(a["Effective Date"]).getTime(),
    ) ?? [])?.[0]?.["Job Title"] ?? "";
  // Leave Requests Data
  const request_data: database_leave_requests_type = leave_requests?.find(
    (request: database_leave_requests_type) => request.id == leave_request_id,
  );
  // Mutation Function for Updating Leave Request
  const queryClient = useQueryClient();
  const { mutate: update } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await updateLeaveRequest(
        formData,
        employeeId,
        request_data,
        current_user_profile?.leave_balance,
      );
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Request Updated Successfully");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_requests"] });
      queryClient.invalidateQueries({ queryKey: ["all_profiles"] });
      //Router.back();
    },
  });
  // Mutation Function for Inserting Leave Request
  const { mutate: insert } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await insertLeaveRequest(
        formData,
        employeeId,
        current_user_profile?.leave_balance,
      );
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Request Added Successfully");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_requests"] });
      //Router.back();
    },
  });
  // Mutation Function for Canceling Leave Request
  const { mutate: cancel, isPending: isCanceling } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await cancelLeaveRequest(formData, request_data?.id);
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Request Canceled Successfully");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_requests"] });
      Router.back();
    },
  });
  return (
    <>
      {toastContainer}
      <div className="z-50 flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
            {leave_request_id ? "Edit Time Off Request" : "Record Time Off"}
          </h1>
          <div onClick={() => Router.back()}>
            <CgClose className="cursor-pointer text-3xl text-gray-15" />
          </div>
        </div>
        <div className="shadow-popup flex w-full min-w-[50rem] flex-col items-center bg-white px-8 py-6">
          <header className="flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
            <Image
              src={current_user_profile?.avatar || default_avatar}
              className="h-12 w-12 rounded-full"
              alt=""
              width={80}
              height={80}
            />
            <div className="flex flex-col">
              <div className="m-0 block text-[1.2rem] font-normal capitalize leading-[1.733rem] text-black">
                {full_name}
              </div>
              <div className="text-sm leading-6 text-gray-21">{job_title}</div>
            </div>
          </header>
          <Hr />
          <form
            className="flex w-full flex-col gap-4 px-2 pt-3"
            action={async (formData: FormData) =>
              leave_request_id ? update(formData) : insert(formData)
            }
          >
            <DateRangeContextProvider>
              <FormInputs />
            </DateRangeContextProvider>
            <hr className="h-[3px] w-full bg-primary-gradient" />
            <div className="flex flex-row gap-4 px-2 pt-3">
              <SubmitBtn disabled={isCanceling} className="!w-fit">
                Save
              </SubmitBtn>
              {user_profile?.user_id === request_data?.user_id && (
                <button
                  type="button"
                  className="h-11 w-fit cursor-pointer rounded-md bg-gray-14 px-3 font-semibold text-gray-25 transition-all duration-300 ease-linear hover:bg-gray-16 disabled:cursor-wait disabled:bg-gray-16"
                  disabled={isCanceling}
                  formAction={(formData: FormData) => cancel(formData)}
                >
                  Cancel Request
                </button>
              )}
              <button
                className="cursor-pointer text-color5-500 hover:underline "
                type="button"
                onClick={() => Router.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
