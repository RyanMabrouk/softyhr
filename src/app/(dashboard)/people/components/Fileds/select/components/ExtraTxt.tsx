"use client";
import getCurrentorg from "@/api/getCurrentOrg";
import { RowFieldType } from "@/types/database.tables.types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { headers } from "next/headers";
import { GetJobUrl } from "@/helpers/Hiring/GetJobUrl.helper";
import { UnderlinedLink } from "@/app/_ui/UnderlinedLink";

interface ExtraTxtpropsType {
  RowField: RowFieldType;
}

function ExtraTxt({ RowField }: ExtraTxtpropsType) {
    const [careerUrl, setcareerUrl] = useState("");
    useEffect(()=>{
        console.log((async () => await GetJobUrl())());
        setcareerUrl(String((async () => await GetJobUrl())()));
    },[])
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
