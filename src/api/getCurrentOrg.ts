"use server";

import { headers } from "next/headers";
import { getValidSubdomain } from "./getValidSubdomain";

const hostnamedb = [
  { name: "softyeducation", org_id: "1f5f-4fv8-78rv-r8fv" },
  { name: "takiacademy", org_id: "1fpl-4ffj-78rv-r45v" },
];

export default async function getCurrentorg() {
  const subdomain = headers().get("host")?.split(".")[0];
  const current_org = getValidSubdomain(subdomain);
  const org = hostnamedb.find((org) => org?.name === current_org);
  return org;
}
