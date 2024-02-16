import { useCallback } from "react";
export default function createNewPathname({
  currentPathname,
  currentSearchParams,
  name,
  value,
}: {
  currentPathname: string;
  currentSearchParams: URLSearchParams;
  name: string;
  value: string;
}) {
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString());
    params.set(name, value);

    return params.toString();
  };
  return currentPathname + "?" + createQueryString(name, value);
}
