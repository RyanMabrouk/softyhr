import adjustLeavePolicyBalance from "@/actions/leave/adjustLeavePolicyBalance";
import { SubmitBtn } from "@/app/(auth)/login/_ui/SubmitBtn";
import useData from "@/hooks/useData";
import useToast from "@/hooks/useToast";
import {
  database_leave_policies_type,
  database_profile_leave_balance_type,
  database_profile_type,
} from "@/types/database.tables.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import default_avatar from "/public/default_avatar.jpeg";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import { AmountSelect } from "./AmountSelect";
export default function AdjustLeavePolicyBalance() {
  const { toast, toastContainer } = useToast();
  const Router = useRouter();
  const [addedHours, setAddedHours] = useState(0);
  const [additionType, setAdditionType] = useState<"1" | "-1">("1"); // ["1", "-1"]
  const queryClient = useQueryClient();
  const leave_policy_id = useSearchParams().get("leave_policy_id");
  const { employeeId } = useParams();
  const {
    all_profiles: { data: all_profiles },
    leave_policies: { data: leave_policies },
  } = useData();
  // cuurrent user profile
  const current_user_profile = all_profiles?.find(
    (profile: database_profile_type) => profile.user_id === employeeId,
  );
  // current policy balance
  const leave_balance: database_profile_leave_balance_type[] =
    current_user_profile?.leave_balance;
  const policy_balance = leave_balance?.find(
    (e) => e.policy_id == Number(leave_policy_id),
  )?.balance;
  // current policy data
  const leave_policy_data: database_leave_policies_type = leave_policies?.find(
    (policy: database_leave_policies_type) =>
      policy.id == Number(leave_policy_id),
  );
  const { mutate: insert, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await adjustLeavePolicyBalance({
        formData: formData,
        policy_id: Number(leave_policy_id),
        user_id: employeeId,
        additionType: additionType,
      });
      if (error) {
        toast.error(error.message, error.type);
      } else {
        toast.success("Leave Policy Balance Adjusted", "Success");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave_accrued"] });
      queryClient.invalidateQueries({ queryKey: ["all_profiles"] });
      //Router.back();
    },
  });
  return (
    <>
      {toastContainer}
      <div className="z-50 flex flex-col gap-2">
        <div className="z-50 flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1 className=" pb-2 text-2xl font-normal text-fabric-700">
              {`Adjust ${leave_policy_data?.name} Balance`}
            </h1>
            <div onClick={() => Router.back()}>
              <CgClose className="cursor-pointer text-3xl text-gray-15" />
            </div>
          </div>
        </div>
        <div className="shadow-popup flex w-full min-w-[35rem] flex-col items-center rounded-sm bg-white px-8 py-6">
          <header className="flex w-full flex-row items-center gap-2 bg-gray-14 px-4 py-3">
            <Image
              src={default_avatar}
              className="h-12 w-12 rounded-full"
              alt=""
              width={80}
              height={80}
            />
            <div className="m-0 block text-[1.2rem] font-normal capitalize leading-[1.733rem] text-black">
              {"Rayen Mabrouk"}
            </div>
          </header>
          <form
            action={insert}
            className="flex w-full flex-col items-center justify-start gap-3"
          >
            <div className="flex w-full flex-row items-end justify-start gap-6 pt-3">
              <AmountSelect
                options={[
                  { label: "Add", value: "1" },
                  {
                    label: "Subtract",
                    value: "-1",
                  },
                ]}
                defaultValue={{ label: "Add", value: "1" }}
                label="Amount"
                name="+/-"
                setValueInParent={setAdditionType}
              />
              <input
                type="number"
                name={"added_hours"}
                className="focus:shadow-green flex h-9 w-12 items-center justify-center rounded-md border border-gray-18 p-2 px-3 text-gray-27 focus:outline-none"
                placeholder="0"
                value={addedHours ? addedHours : ""}
                onChange={(e) => setAddedHours(Number(e.target.value))}
                required
              />
            </div>
            <div className="flex w-full  flex-col gap-1">
              <label htmlFor="note" className="text-sm text-gray-21">
                Note
              </label>
              <textarea
                name="note"
                className="focus:shadow-green w-full rounded-md border  border-gray-18 px-2 py-1 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] placeholder:text-gray-14 focus:outline-none "
                id="note"
                cols={10}
                rows={2}
                required
                draggable
              />
            </div>
            <div className="flex w-full  flex-col gap-1">
              <label htmlFor="note" className="text-sm text-gray-21">
                Summary
              </label>
              <header className="flex w-full flex-col items-start gap-2 bg-gray-14 px-4 py-3">
                <div className="flex w-full flex-row items-center justify-between text-gray-25">
                  <span>{`Current ${leave_policy_data?.name} Balance`}</span>
                  <span>{policy_balance}</span>
                </div>
                <div
                  className={`flex w-full flex-row items-center justify-between ${
                    Number(additionType) > 0
                      ? "text-color-primary-4"
                      : "text-color9-500"
                  }`}
                >
                  <span>
                    {Number(additionType) > 0 ? "Added" : "Subtracted"}
                  </span>
                  <span>{`${addedHours} hours`}</span>
                </div>
                <hr className="my-2 h-[1px]  w-full bg-gray-18" />
                <div className="text-gray-gray-20 flex w-full flex-row items-center justify-between">
                  <span>New Balance</span>
                  <span>{`${Number(policy_balance) + addedHours} hours`}</span>
                </div>
              </header>
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
        </div>
      </div>
    </>
  );
}
