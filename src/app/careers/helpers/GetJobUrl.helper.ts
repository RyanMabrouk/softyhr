"use server";
import getCurrentorg from "@/api/getCurrentOrg";
import { headers } from "next/headers";
export async function GetJobUrl(JobId?: string) {
  const org = await getCurrentorg();
  const header_url = headers().get("host") || "";
  const JobUrl = `${header_url}/careers/${JobId || ""}`;
  return JobUrl;
}
