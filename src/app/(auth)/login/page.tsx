import getSession from "@/actions/getSession";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await getSession();
  if (session) redirect("/");
  return <div>log in page</div>;
}
