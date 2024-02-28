"use client";
import useData from "@/hooks/useData";
import { database_leave_requests_type } from "@/types/database.tables.types";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useContext, useRef } from "react";
import cancelLeaveRequest from "@/actions/leave/cancelLeaveRequest";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import updateLeaveRequest from "@/actions/leave/updateLeaveRequest";
import { FormInputs } from "./FormInputs";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import insertLeaveRequest from "@/actions/leave/insertLeaveRequest";
import { errorContext, errorContextType } from "../context/errorContext";
import { checkIfOjectValuesAreEmpty } from "@/helpers/array.helpers";
import useEmployeeData from "@/hooks/useEmloyeeData";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { useAlreadyBooked } from "../hooks/useAlreadyBooked";

export function From() {
  const Router = useRouter();
  const pathname = usePathname();
  const {
    user_profile: { data: user_profile },
  } = useData();
  const employeeId = useParams().employeeId ?? user_profile?.user_id;
  const searchParams = useSearchParams();
  const leave_request_id = Number(searchParams.get("leave_request_id"));
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { formError } = useContext<errorContextType>(errorContext);
  const {
    leave_requests: { data: leave_requests },
  } = useEmployeeData({ employeeId: String(employeeId) });
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
        toast.success("Leave Request Updated Successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leave_requests", employeeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance", employeeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance"],
      });
      Router.push(pathname);
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
        toast.success("Leave Request Added Successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leave_requests", employeeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance", employeeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance"],
      });
      Router.push(pathname);
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
        toast.success("Leave Request Canceled Successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leave_requests", employeeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance", employeeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave_balance"],
      });
      formRef.current?.reset();
      Router.push(pathname);
    },
  });
  const already_booked = useAlreadyBooked(employeeId);
  return (
    <form
      ref={formRef}
      className="flex w-full flex-col gap-4 px-2 pt-3"
      action={async (formData: FormData) => {
        const duration = formData
          .getAll("duration_date")
          .reduce((acc, e) => acc + Number(e), 0);
        if (duration === 0) {
          toast.error("Duration must be greater than 0", "Error");
          return;
        }
        if (formData.get("policy_id") === "none") {
          toast.error("Please select a category", "Error");
          return;
        }
        if (already_booked) return;
        if (formError && !checkIfOjectValuesAreEmpty(formError)) return;
        leave_request_id ? update(formData) : insert(formData);
      }}
    >
      <FormInputs />
      <hr className="h-[3px] w-full bg-primary-gradient" />
      <div className="flex flex-row gap-4 px-2 pt-3">
        <SubmitBtn disabled={isCanceling} className="!w-fit">
          {leave_request_id ? "Save" : "Send request"}
        </SubmitBtn>
        {user_profile?.user_id === request_data?.user_id && (
          <button
            type="submit"
            className="h-11 w-fit cursor-pointer rounded-md bg-gray-14 px-3 font-semibold text-gray-25 transition-all duration-300 ease-linear hover:bg-gray-16 disabled:cursor-wait disabled:bg-gray-16"
            disabled={isCanceling || formError !== null}
            formAction={(formData: FormData) => cancel(formData)}
          >
            Cancel request
          </button>
        )}
        <CancelBtnGeneric />
      </div>
    </form>
  );
}
