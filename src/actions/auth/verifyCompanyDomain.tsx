"use server";
import getData from "@/api/getData";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function verifyCompanyDomain(formData: FormData) {
  const headersList = headers();
  const header_url = headersList.get("host") || "";
  const proto = headers().get("x-forwarded-proto") || "http";
  const copanyDomain = formData.get("companydomain");
  const { data: hostnamedb } = await getData("organizations", {
    match: { name: copanyDomain },
  });
  console.log("🚀 ~ file: verifyCompanyDomain.tsx:13 ~ verifyCompanyDomain ~ hostnamedb:", hostnamedb)
  if (hostnamedb?.length === 1)
    redirect(`${proto}://${copanyDomain}.${header_url}/login`);
  else
    return {
      error: {
        message: "Please verify your domain name",
        type: "Domain doesnt exist",
      },
    };
}
