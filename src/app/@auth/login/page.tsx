import getCurrentorg from "@/api/getCurrentOrg";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const current_org = await getCurrentorg();
  if (current_org) redirect("/home");
  return <div>log in page</div>;
}
