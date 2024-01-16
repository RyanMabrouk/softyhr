"use client";
import React from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import Image from "next/image";
import default_avatar from "/public/default_avatar.jpeg";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import changePolicy from "@/actions/leave/changePolicy";
import useToast from "@/hooks/useToast";
import useData from "@/hooks/useData";
import useEmployeeData from "@/hooks/useEmloyeeData";
import {
  database_leave_policies_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";

export default function ChangeLeavePolicy() {
  const { toast } = useToast();
  const Router = useRouter();
  const { employeeId } = useParams();
  const policy_id = useSearchParams().get("policy_id");
  const queryClient = useQueryClient();
  const {
    leave_policies: { data: leave_policies },
    leave_categories: { data: leave_categories },
  } = useData();
  const {
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: employeeId });
  const policy: database_leave_policies_type = leave_policies?.find(
    (p: database_leave_policies_type) => p.id == Number(policy_id),
  );
  const category: databese_leave_categories_type = leave_categories?.find(
    (c: databese_leave_categories_type) => c.id == policy?.categories_id,
  );
  const defaultValue = {
    value: policy?.id,
    label: policy?.name,
  };
  const options = leave_policies
    ?.filter(
      (policy: database_leave_policies_type) =>
        category?.id == policy.categories_id,
    )
    .map((policy: database_leave_policies_type) => ({
      value: policy?.id,
      label: policy?.name,
    }));
  // current employee full name
  const full_name: string =
    employee_profile?.["Basic Information"]?.["First name"] +
    " " +
    employee_profile?.["Basic Information"]?.["Last name"];
  // change leave policy mutation
  const { mutate: change, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const new_policy_id = formData.get("policy_id") as string;
      const { error } = await changePolicy({
        new_policy_id: new_policy_id,
        user_id: employeeId,
        old_policy_id: policy?.id,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Policy Changed", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles", employeeId] });
      Router.back();
    },
  });
  return (
    <PopUpSkeleton
      title={`Change ${category?.name} Leave Policy`}
      className="flex w-full min-w-[50rem] flex-col px-8 py-6"
    >
      <header className="flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
        <Image
          src={default_avatar}
          className="h-12 w-12 rounded-full"
          alt=""
          width={80}
          height={80}
        />
        <div className="m-0 block text-[1.2rem] font-normal capitalize leading-[1.733rem] text-black">
          {full_name ?? ""}
        </div>
      </header>
      <form
        className="flex w-full flex-col items-center justify-start gap-3"
        action={(formData: FormData) => change(formData)}
      >
        <div className="flex w-full flex-col items-start justify-start gap-4 px-4 py-3">
          <div className="flex flex-col justify-center">
            <span className="relative w-fit text-sm text-gray-21">
              Current Vacation Policy
            </span>
            <span className="capitalize">{policy?.name}</span>
          </div>
          <SelectGeneric
            label="New Vacation Policy"
            name="policy_id"
            options={options}
            defaultValue={defaultValue}
          />
        </div>
        <hr className="h-[3px] w-full bg-primary-gradient" />
        <div className="flex w-full flex-row items-center justify-start gap-4 px-2 pt-3">
          <SubmitBtn disabled={isPending} className="!w-fit">
            Save
          </SubmitBtn>
          <button
            className="cursor-pointer text-color5-500 hover:underline "
            type="button"
            onClick={() => Router.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </PopUpSkeleton>
  );
}
