"use server";
import { headers } from "next/headers";
import { getValidSubdomain } from "./getValidSubdomain";
import getData from "./getData";
import { organizations_type } from "@/types/database.tables.types";
export default async function getCurrentorg(): Promise<organizations_type | null> {
  const subdomain = headers().get("host")?.split(".")[0];
  const current_org = getValidSubdomain(subdomain);
  const { data: org } = await getData("organizations", {
    match: { name: current_org },
  });
  return org?.[0];
}
