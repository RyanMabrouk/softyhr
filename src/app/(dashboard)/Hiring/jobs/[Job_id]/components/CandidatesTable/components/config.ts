import React from "react";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Candidate Info", uid: "Candidate Info", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Rating", uid: "Rating", sortable: true },
  { name: "Applied", uid: "Applied" },
  { name: "Last Email", uid: "Last Email" },
  { name: "Changes Status", uid: "Changes Status" },
  { name: "", uid: "actions" },
];

const CandidateStatusOptions = [
  { name: "All", uid: "All" },
  { name: "Not Qualified", uid: "Not Qualified" },
  { name: "Declined Offer", uid: "Declined Offer" },
  { name: "Interviwed", uid: "Interviwed" },
  { name: "Put On Hold", uid: "Put On Hold" },
  { name: "NEW", uid: "NEW" },
  { name: "Hired", uid: "Hired" },
  { name: "Not a Fit", uid: "Not a Fit" },
];

export const candidateStatusGeneric: string[] = [
 "Not Qualified","Declined Offer" , "Interviwed" , "Put On Hold" ,"NEW" ,"Hired" , "Not a Fit" 
];
export { columns, CandidateStatusOptions };


export interface TableCandidateType {
      id: string,
      "Candidate Info":string,
      Status: string,
      Status_update: string,
      Rating: number,
      Applied: string,
      "Last Email": string,
};