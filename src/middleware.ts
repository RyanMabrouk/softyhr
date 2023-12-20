import { NextRequest, NextResponse } from "next/server";
import { getValidSubdomain } from "./api/getValidSubdomain";

export const config = {
  matcher: ["/", "/test", "/test/:test1*", "/NOT-FOUND"], //routes that pass through middleware.ts before handle them
};

interface CustomRequest extends NextRequest {
  customData?: any;
  pathname: string;
}

const hostnamedb = [
  { name: "softyeducation", org_id: "1f5f-4fv8-78rv-r8fv" },
  { name: "takiacademy", org_id: "1fpl-4ffj-78rv-r45v" },
];

export default async function middleware(req: CustomRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const current_org = getValidSubdomain(hostname);
  console.log("object");
  const org = hostnamedb.find((org) => org?.name === current_org);
  console.log(current_org);
  if (!org) {
    const redirectUrl = new URL("/", `${req.nextUrl.origin}`);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.rewrite(url);
}
