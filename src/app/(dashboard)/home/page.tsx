import getCurrentorg from "@/api/getCurrentOrg";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const current_org = await getCurrentorg();
  return <div className="text-black">{current_org?.name} is subscribed</div>;
}

export default Page;
