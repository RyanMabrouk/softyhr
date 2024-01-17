"use client";

import Select from "@/app/(dashboard)/Files/_ui/components/Select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function SortBy({ options }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  function handleChange(term: any) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(params);
  }

  return (
    <Select
      options={options}
      type="white"
      defaultValue={searchParams.get("query")?.toString()}
      handleChange={handleChange}
    />
  );
}

// function SortBy({ options }: any) {
//   return <Select options={options} />;
// }

export default SortBy;
