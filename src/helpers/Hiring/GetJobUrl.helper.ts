"use client";
import getCurrentorg from "@/api/getCurrentOrg";

export async function GetJobUrl(JobId: string) {
  const org = await getCurrentorg();

  console.log(org);
  return "";
}
