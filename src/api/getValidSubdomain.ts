import { getLogger } from "@/logging/log-util";

export const getValidSubdomain = (host?: string | null) => {
  const logger = getLogger("*");
  logger.info("getValidSubdomain_enter");
  if (!host && typeof window !== "undefined") {
    host = window.location.host;
  }
  const candidate = host?.split(".")[0];
  logger.info("getValidSubdomain_exit");
  return candidate && !candidate.includes("localhost") ? candidate : null;
};
