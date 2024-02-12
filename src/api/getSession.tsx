"use server";
import { getLogger } from "@/logging/log-util";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getSession() {
  const logger = getLogger("*");
  logger.info("getting session");
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    logger.error(error?.message);
  }
  return session;
}
