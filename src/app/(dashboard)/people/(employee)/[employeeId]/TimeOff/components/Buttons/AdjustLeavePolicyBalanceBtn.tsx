import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TbPlusMinus } from "react-icons/tb";
import useTranslation from "@/translation/useTranslation";

export function AdjustLeavePolicyBalanceBtn({ id }: { id: number }) {
  const pathname = usePathname();
  const { lang } = useTranslation();
  return (
    <Link
      className="tooltip tooltip-bottom "
      data-tip={lang?.["Time Off"]["Adjust balance"]}
      href={{
        pathname: pathname,
        query: { leave_policy_id: id, popup: "ADJUST_LEAVE_POLICY_BALANCE" },
      }}
    >
      <TbPlusMinus className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-black bg-white px-2 text-center " />
    </Link>
  );
}
