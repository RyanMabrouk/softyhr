"use client";
import getCurrentorg from "@/api/getCurrentOrg";
import { RowFieldType } from "@/types/database.tables.types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { headers } from "next/headers";
import { UnderlinedLink } from "@/app/_ui/UnderlinedLink";
import { GetJobUrl } from "@/app/careers/helpers/GetJobUrl.helper";

interface ExtraTxtpropsType {
  RowField: RowFieldType;
}

function ExtraTxt({ RowField }: ExtraTxtpropsType) {
    const [careerUrl, setcareerUrl] = useState("");
   useEffect(() => {
     (async () => {
       const url = await GetJobUrl();
       setcareerUrl(url);
     })();
   }, []);

  return (
    <div className="flex items-center justify-start gap-[1rem]">
      {RowField?.ExtraTxt_org && (
        <div className="flex items-center justify-start gap-[1rem]">
          <p className="text-sm text-gray-29">
            {RowField?.ExtraTxt_org?.slice(
              0,
              RowField?.ExtraTxt_org?.indexOf("["),
            )}
          </p>
          <UnderlinedLink>
            <Link className="" href="/careers">
              {String(careerUrl)?.slice(0,String(careerUrl)?.lastIndexOf("/"))}
            </Link>
          </UnderlinedLink>
        </div>
      )}
    </div>
  );
}

export default ExtraTxt;
