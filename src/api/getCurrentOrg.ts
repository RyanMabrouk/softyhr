"use server";
import { headers } from "next/headers";
import { getValidSubdomain } from "./getValidSubdomain";
import getData from "./getData";
import { organizations_type } from "@/types/database.tables.types";
export default async function getCurrentorg() {
  const { data: hostnamedb } = await getData("organizations");
  const subdomain = headers().get("host")?.split(".")[0];
  const current_org = getValidSubdomain(subdomain);
  const org = hostnamedb?.find(
    (org: organizations_type) => org?.name === current_org,
  );
  return org;
}
