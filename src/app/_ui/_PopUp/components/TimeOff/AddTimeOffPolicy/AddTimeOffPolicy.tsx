"use client";
import React from "react";
import PopUpSkeleton from "../../../PopUpSkeleton";
import Image from "next/image";
import useToast from "@/hooks/useToast";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useData from "@/hooks/useData";
import useEmployeeData from "@/hooks/useEmloyeeData";
import default_avatar from "/public/default_avatar.jpeg";
import { SelectGeneric } from "@/app/_ui/SelectGeneric";
import {
  database_leave_policies_type,
  database_profile_leave_balance_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { capitalizeFirstLetter } from "@/helpers/string.helpers";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import addLeavePolicy from "@/actions/leave/addLeavePolicy";
import changePolicy from "@/actions/leave/changePolicy";
export default function AddTimeOffPolicy() {
  const { toast } = useToast();
  const Router = useRouter();
  const { employeeId } = useParams();
  const queryClient = useQueryClient();
  const {
    leave_policies: { data: leave_policies },
    leave_categories: { data: leave_categories },
  } = useData();
  const {
    employee_profile: { data: employee_profile },
  } = useEmployeeData({ employeeId: employeeId });
  // current employee full name
  const first_name: string =
    employee_profile?.["Basic Information"]?.["First name"];
  const last_name: string =
    employee_profile?.["Basic Information"]?.["Last name"];
  // Current employee policies
  const current_policies = employee_profile?.leave_balance.map(
    (e: database_profile_leave_balance_type) => e.policy_id,
  );
  const current_categories = employee_profile?.leave_balance.map(
    (e: database_profile_leave_balance_type) => e.categories_id,
  );
  // Options
  const options =
    leave_categories?.reduce(
      (acc: [], c: databese_leave_categories_type) => [
        ...acc,
        { group_name: c.name },
        ...leave_policies
          ?.filter(
            (p: database_leave_policies_type) => p.categories_id === c.id,
          )
          .map((p: database_leave_policies_type) => ({
            label: p.name,
            value: p.id,
            disabled: current_policies?.includes(p.id),
          })),
      ],
      [],
    ) || [];
  // add leave policy mutation
  const { mutate: add, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const policy_id = formData.get("policy_id") as string;
      const policy = leave_policies.find(
        (p: database_leave_policies_type) => p.id === Number(policy_id),
      );
      if (!policy) {
        toast.error("Please choose a policy", "Error");
        return;
      }
      const categories_id = leave_categories?.find(
        (c: databese_leave_categories_type) => c.id === policy?.categories_id,
      )?.id;
      const { error } = current_categories.includes(categories_id)
        ? await changePolicy({
            old_policy_id: employee_profile?.leave_balance.find(
              (e: database_profile_leave_balance_type) =>
                e.categories_id === categories_id,
            )?.policy_id,
            new_policy_id: policy_id,
            user_id: employeeId,
          })
        : await addLeavePolicy({
            categories_id: categories_id,
            policy_id: policy_id,
            user_id: employeeId,
          });
      if (error) {
        return;
      } else {
        toast.success(
          `${capitalizeFirstLetter(
            first_name,
          )} has been added to the policy successfully`,
          "Success",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profiles", employeeId],
      });
      Router.back();
    },
  });
  return (
    <PopUpSkeleton
      title="Add Time Off Policy"
      className="flex w-full min-w-[50rem] flex-col gap-4 px-8 py-6"
    >
      <header className="flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
        <Image
          src={employee_profile?.picture ?? default_avatar}
          className="h-12 w-12 rounded-full"
          alt=""
          width={80}
          height={80}
        />
        <div className="m-0 block text-[1.2rem] font-normal capitalize leading-[1.733rem] text-black">
          {first_name + " " + last_name}
        </div>
      </header>
      <form
        action={add}
        className="flex w-full flex-col items-start justify-start gap-3"
      >
        <div className="mb-2 ml-4">
          <SelectGeneric
            label={`Add ${capitalizeFirstLetter(first_name)} to...`}
            name="policy_id"
            defaultValue={{ label: "Policies", value: "none" }}
            required={true}
            group={true}
            inputLabel="Policies"
            options={options}
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
