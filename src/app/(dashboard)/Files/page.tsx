import getCurrentorg from "@/api/getCurrentOrg";
import React from "react";

export default async function Page() {
  const current_org = await getCurrentorg();
  
  return <></>;
}
