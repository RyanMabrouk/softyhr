import getCurrentorg from "@/api/getCurrentOrg";
import React from "react";

export default async function Page() {
  const current_org = await getCurrentorg();
  return <div className="gao-2 flex flex-col p-4 text-black">files</div>;
}
