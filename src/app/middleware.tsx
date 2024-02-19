import { NextRequest, NextResponse } from "next/server";
import { getValidSubdomain } from "../api/getValidSubdomain";
import getData from "../api/getData";
import { getLogger } from "../logging/log-util";
export const config = {
  matcher: ["/", "/Home", "/NOT-FOUND", "/employees", "/employees/:employeeId"],
};
export default async function middleware(req: NextRequest) {
  const logger = getLogger("*");
  logger.info("middleware (valid org)");
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const current_org = getValidSubdomain(hostname);
  const { data: org } = await getData("organizations", {
    column: "name",
    match: { name: current_org },
  });
  if (org?.length === 0) {
    return NextResponse.rewrite(new URL("/", req.url));
  }
  return NextResponse.rewrite(url);
}
