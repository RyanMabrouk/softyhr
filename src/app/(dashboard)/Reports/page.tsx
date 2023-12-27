import getCurrentorg from "@/api/getCurrentOrg";
import SignOutBtn from "@/app/_ui/SignOutBtn";
import React from "react";
export async function Page() {
  const current_org = await getCurrentorg();
  return (
    <div className="gao-2 flex flex-col p-4 text-black">
      {current_org?.name} is subscribed <SignOutBtn />
    </div>
  );
}
export default Page;
