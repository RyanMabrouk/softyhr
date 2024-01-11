import { NextRequest, NextResponse } from "next/server";
import { getValidSubdomain } from "./api/getValidSubdomain";
import getData from "./api/getData";
export const config = {
  matcher: ["/", "/Home", "/NOT-FOUND", "/employees", "/employees/:employeeId"], //routes that pass through middleware.ts before handle them
};
export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const current_org = getValidSubdomain(hostname);
  const { data: org } = await getData("organizations", {
    column: "name",
    match: { name: current_org },
  });
  if (org?.length === 0) {
    //req.headers.set("host", "localhost:3001");
    return NextResponse.rewrite(new URL("/", req.url));
  }
  return NextResponse.rewrite(url);
}
