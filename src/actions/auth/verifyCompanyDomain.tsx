"use server";
import getData from "@/api/getData";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function verifyCompanyDomain(formData: FormData) {
  const headersList = headers();
  const header_url = headersList.get("host") || "";
  const copanyDomain = formData.get("companydomain");
  const { data: hostnamedb } = await getData("organizations");
  const hostname = hostnamedb?.find((org) => org.name === copanyDomain)?.name;
  if (hostname) redirect(`http://${hostname}.${header_url}/login`);
  else console.log("🚀 ~ please verify your domain name");
}
