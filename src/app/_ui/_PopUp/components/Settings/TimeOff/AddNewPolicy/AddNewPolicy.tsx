import CancelBtnGeneric from "@/app/_ui/CancelBtnGeneric";
import { SubmitBtn } from "@/app/_ui/SubmitBtn";
import PopUpSkeleton from "@/app/_ui/_PopUp/PopUpSkeleton";
import useToast from "@/hooks/useToast";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { LiaHourglassEndSolid } from "react-icons/lia";
import { TypeCheckBox } from "./TypeCheckBox";
import Link from "next/link";
import InsightGeneric from "@/app/_ui/InsightGeneric";
export default function AddNewPolicy() {
  const { toast } = useToast();
  const Router = useRouter();
  const pathname = usePathname();
  return (
    <PopUpSkeleton
      title="New Time Off Policy"
      className="flex max-w-[70rem] flex-col gap-4 px-10 py-6"
    >
      <form
        className="flex w-full flex-col items-center justify-center gap-5"
        action={(formData) => {
          const type = formData.get("type");
          if (!type) {
            toast.error("Please select a type", "Error");
            return;
          }
          Router.push(`${pathname}/policy?type=${type}`);
        }}
      >
        <section className="flex w-full flex-col items-center justify-center  gap-2 text-center text-gray-27">
          <LiaHourglassEndSolid className="h-16 w-16 text-fabric-700" />
          <p className="text-xl">Let's get this show on the road</p>
          <p className="text-gray-20 opacity-80">
            First off, what kind of policy will this be?
          </p>
        </section>
        <TypeCheckBox />
        <div className="flex flex-row items-center gap-1 px-12 text-[0.95rem] text-gray-20 opacity-80">
          Or,
          <Link
            href={{
              pathname: pathname + "/policy",
              query: { type: "manual" },
            }}
            className="cursor-pointer text-[0.9rem] font-bold text-fabric-700 opacity-100 transition-all ease-linear hover:underline"
          >
            create a Manually Managed Policy
          </Link>
          that doesn't automatically accrue time.
          <InsightGeneric
            position="right"
            tip="Choose this option if you prefer to keep time off balances up to date by adjusting them manually. This means employees won’t accrue any time automatically."
          />
        </div>
        <hr className="h-[3px] w-full bg-primary-gradient" />
        <div className="flex w-full flex-row items-center justify-start gap-4 px-2 pt-3">
          <SubmitBtn className="!w-fit">Create Policy</SubmitBtn>
          <CancelBtnGeneric />
        </div>
      </form>
    </PopUpSkeleton>
  );
}
