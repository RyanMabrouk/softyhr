import React from "react";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Candidate Info", uid: "Candidate Info", sortable: true },
  { name: "Status", uid: "Status", sortable: true },
  { name: "Rating", uid: "Rating", sortable: true },
  { name: "Applied", uid: "Applied" },
  { name: "Last Email", uid: "Last Email" },
  { name: "Changes Status", uid: "Changes Status" },
  { name: "", uid: "actions" },
];

const CandidateStatusOptions = [
  { name: "All", uid: "All" },
  { name: "NEW", uid: "NEW" },
  { name: "Hired", uid: "hired" },
  { name: "Not a Fit", uid: "Not a Fit" },
];

export { columns, CandidateStatusOptions };
