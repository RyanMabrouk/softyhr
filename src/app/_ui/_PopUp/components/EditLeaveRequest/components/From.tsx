"use client";
import useData from "@/hooks/useData";
import { database_leave_requests_type } from "@/types/database.tables.types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useRef } from "react";
import cancelLeaveRequest from "@/actions/leave/cancelLeaveRequest";
import { SubmitBtn } from "@/app/(auth)/login/_ui/SubmitBtn";
import updateLeaveRequest from "@/actions/leave/updateLeaveRequest";
import DateRangeContextProvider from "../context/dateRangeContext";
import { FormInputs } from "./FormInputs";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import insertLeaveRequest from "@/actions/leave/insertLeaveRequest";
import { errorContext, errorContextType } from "../context/errorContext";
import { checkIfOjectValuesAreEmpty } from "@/helpers/array.helpers";

export function From() {
  const Router = useRouter();
  const { employeeId } = useParams();
  const searchParams = useSearchParams();
  const leave_request_id = Number(searchParams.get("leave_request_id"));
  const { toast, toastContainer } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { formError } = useContext<errorContextType>(errorContext);
  const {
    leave_requests: { data: leave_requests, isPending: isPending2 },
    user_profile: { data: user_profile, isPending: isPending3 },
  } = useData();
  // Leave Requests Data
  const request_data: database_leave_requests_type = leave_requests?.find(
    (request: database_leave_requests_type) => request.id == leave_request_id,
  );
  // Mutation Function for Updating Leave Request
  const queryClient = useQueryClient();
  const { mutate: update } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await updateLeaveRequest({
        formData: formData,
        user_id: employeeId,
        old_request: request_data,
      });
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
      const { error } = await insertLeaveRequest({
        formData: formData,
        user_id: employeeId,
      });
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
      const { error } = await cancelLeaveRequest({
        leave_request: request_data,
        user_id: employeeId,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Request Canceled Successfully");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_requests"] });
      queryClient.invalidateQueries({ queryKey: ["all_profiles"] });
      formRef.current?.reset();
      //Router.back();
    },
  });
  return (
    <>
      {toastContainer}
      <form
        ref={formRef}
        className="flex w-full flex-col gap-4 px-2 pt-3"
        action={async (formData: FormData) => {
          if (formError && !checkIfOjectValuesAreEmpty(formError)) return;
          leave_request_id ? update(formData) : insert(formData);
        }}
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
              type="submit"
              className="h-11 w-fit cursor-pointer rounded-md bg-gray-14 px-3 font-semibold text-gray-25 transition-all duration-300 ease-linear hover:bg-gray-16 disabled:cursor-wait disabled:bg-gray-16"
              disabled={isCanceling || formError !== null}
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
    </>
  );
}
