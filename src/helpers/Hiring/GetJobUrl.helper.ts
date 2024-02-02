"use server";
import getCurrentorg from "@/api/getCurrentOrg";

export async function GetJobUrl(JobId: string) {
  const org = await getCurrentorg();
  const JobUrl = `${org?.name}.${String(process.env.BASE_URL)}/careers/${JobId}`;
  return JobUrl;
}
