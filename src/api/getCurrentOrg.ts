"use server";
import { headers } from "next/headers";
import { getValidSubdomain } from "./getValidSubdomain";
import getData from "./getData";
import { organizations_type } from "@/types/database.tables.types";
import { getLogger } from "@/logging/log-util";
export default async function getCurrentorg(): Promise<organizations_type | null> {
  const logger = getLogger("*");
  logger.info("getCurrentorg_enter");
  const host = headers().get("host")?.split(".");
  const subdomain = host?.[0] === "www" ? host?.[1] : host?.[0];
  const current_org = getValidSubdomain(subdomain);
  const { data: org } = await getData("organizations", {
    match: { name: current_org },
  });
  logger.info("getCurrentorg_exit");
  return org?.[0] ?? "";
}
