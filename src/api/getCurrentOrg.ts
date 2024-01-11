"use server";
import { headers } from "next/headers";
import { getValidSubdomain } from "./getValidSubdomain";
import getData from "./getData";
export default async function getCurrentorg() {
  const subdomain = headers().get("host")?.split(".")[0];
  const current_org = getValidSubdomain(subdomain);
  const { data: org } = await getData("organizations", {
    match: { name: current_org },
  });
  return org?.[0];
}
