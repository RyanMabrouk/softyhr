"use client";
import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import { generateLeaveCategorieIcon } from "@/helpers/leave.helpers";
import usePolicy from "@/hooks/TimeOff/usePolicy";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";
import {
  database_leave_policies_type,
  database_profile_leave_balance_type,
  database_profile_type,
} from "@/types/database.tables.types";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { TiWarning } from "react-icons/ti";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addEmployeesToPolicy from "@/actions/settings/leave/addEmployeesToPolicy";
import useToast from "@/hooks/useToast";
import useLeaveBalances from "@/hooks/TimeOff/useLeaveBalances";
import useAllLeaveBalances from "@/hooks/TimeOff/useAllLeaveBalances";
import useProfiles from "@/hooks/useProfiles";
import {
  SwitchEmployeesDragAndDrop,
  usersWithoutCurrentId,
} from "../components/SwitchEmployeesDragAndDrop/SwitchEmployeesDragAndDrop";

export default function AddEmployeesToPolicy() {
  const { policy_id } = useParams();
  const pathname = usePathname();
  const { toast } = useToast();
  const Router = useRouter();
  const { policy, category } = usePolicy({ policy_id: Number(policy_id) });
  const {
    profiles: { data: all_profiles_basic_info },
  } = useProfiles();
  const {
    leave_policies: { data: leave_policies },
  } = useLeaveData();
  const {
    all_users_leave_balance: { data: all_users_leave_balance },
  } = useAllLeaveBalances();
  const {
    all_users_leave_balance: { data: policy_users_blances },
  } = useLeaveBalances({
    policy_id: Number(policy_id),
  });
  // current category policies
  const current_category_policies: database_leave_policies_type[] | undefined =
    leave_policies?.filter(
      (policy: database_leave_policies_type) =>
        policy?.categories_id === category?.id,
    );
  // users without current policy
  const usersWithoutCurrentPolicy = all_profiles_basic_info
    ?.filter((profile: database_profile_type) => {
      const userAlreadyHasCurrentPolicy = policy_users_blances?.find(
        (balance: database_profile_leave_balance_type) =>
          balance.user_id === profile.user_id,
      );
      return !userAlreadyHasCurrentPolicy;
    })
    .map((profile: any) => {
      const current_policy = current_category_policies?.find(
        (policy: database_leave_policies_type) => {
          const userHasPolicyInCurrentCategory =
            all_users_leave_balance?.find(
              (balance: database_profile_leave_balance_type) =>
                balance.user_id === profile.user_id &&
                balance.policy_id === policy.id,
            ) !== undefined;
          return userHasPolicyInCurrentCategory;
        },
      );
      return {
        user_id: profile.user_id,
        name:
          profile?.["Basic Information"]?.["First name"] +
          " " +
          profile?.["Basic Information"]?.["Last name"],
        current_name:
          current_category_policies && current_category_policies?.length > 1
            ? current_policy?.name ?? ""
            : "",
        current_id: current_policy?.id ?? null,
      };
    });
  //-------------------Drag and Drop--------------------------------
  const [employees, setEmployees] = useState<usersWithoutCurrentId[]>(
    usersWithoutCurrentPolicy ?? [],
  );
  if (usersWithoutCurrentPolicy && !employees) {
    setEmployees(usersWithoutCurrentPolicy);
  }
  const [selectedEmployees, setSelectedEmployees] = useState<
    usersWithoutCurrentId[]
  >([]);
  // add employees to policy mutation
  const queryClient = useQueryClient();
  const { mutate: add, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await addEmployeesToPolicy({
        policy_id: Number(policy_id),
        users: selectedEmployees,
        categories_id: category?.id ?? 0,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Employees added to policy successfully", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_balance"] });
      Router.push(pathname);
    },
  });
  return (
    <PopUpSkeleton
      title="Add Employees To Policy"
      className="flex max-w-[45rem] flex-col gap-4 px-10 py-6"
    >
      <div className="flex flex-row items-center gap-1.5">
        {generateLeaveCategorieIcon({
          categorie: category,
          className: "h-7 w-7 text-fabric-700",
        })}
        <span className="text-lg font-semibold text-gray-27">
          {policy?.name}
        </span>
      </div>
      <hr className="m-0 h-[unset] w-full shrink-0 border-solid border-[rgba(0,0,0,0.12)] bg-gray-14" />
      <form
        action={add}
        className="flex w-full flex-col items-center justify-center gap-5"
      >
        <SwitchEmployeesDragAndDrop
          setEmployees={setEmployees}
          setSelectedEmployees={setSelectedEmployees}
          employees={employees}
          selectedEmployees={selectedEmployees}
        >
          {policy?.type === "unlimited" && (
            <section className="flex flex-row gap-1">
              <TiWarning className="h-6 w-6" />
              <div className="text-gray-20">
                <strong>Heads up! </strong>
                <span className="text-[0.95rem]">
                  Employees added to this policy will lose their existing
                  balance (flexible policies like this one don’t allow for a
                  balance).
                </span>
              </div>
            </section>
          )}
        </SwitchEmployeesDragAndDrop>
        <hr className="h-[3px] w-full bg-primary-gradient" />
        <div className="flex w-full flex-row items-center justify-start gap-4 px-2 pt-3">
          <SubmitBtn
            className="!w-fit"
            disabled={isPending}
            blocked={selectedEmployees.length === 0}
          >
            Save
          </SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
