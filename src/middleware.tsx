import { NextRequest, NextResponse } from "next/server";
import { getValidSubdomain } from "./api/getValidSubdomain";
import getData from "./api/getData";
export const config = {
  matcher: ["/", "/home", "/NOT-FOUND", "/employees", "/employees/:employeeId"], //routes that pass through middleware.ts before handle them
};
interface CustomRequest extends NextRequest {
  customData?: any;
  pathname: string;
}
export default async function middleware(req: CustomRequest) {
  const { data: orgs } = await getData("organizations");
  const hostnamedb = orgs?.map((org) => ({ name: org.name }));
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const current_org = getValidSubdomain(hostname);
  const org = hostnamedb?.find((org) => {
    return org?.name === current_org;
  });
  if (!org) {
    //req.headers.set("host", "localhost:3001");
    return NextResponse.rewrite(new URL("/", req.url));
  }
  return NextResponse.rewrite(url);
}
