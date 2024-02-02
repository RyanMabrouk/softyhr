"use client";
import { useParams } from "next/navigation";
import React, { use } from "react";

export default function Page() {
  const { leave_request_id } = useParams();
  return <div>page {leave_request_id}</div>;
}
