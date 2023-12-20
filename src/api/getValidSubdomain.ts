export const getValidSubdomain = (host?: string | null) => {
  if (!host && typeof window !== "undefined") {
    host = window.location.host;
  }
  const candidate = host?.split(".")[0];
  return candidate && !candidate.includes("localhost") ? candidate : null;
};
