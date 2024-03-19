import { IconType } from "react-icons/lib";
import { FaCommentAlt, FaInfoCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { LuMail } from "react-icons/lu";

export const CandidateProfileRoutes: CandidateProfileRoutesType[] = [
  {
    label: "Candidates info",
    Icon: FaInfoCircle,
    Pathname: "Candidate-info",
    path: (job_id: string, CandidateId: string) =>
      `/Hiring/jobs/${job_id}/profile/${CandidateId}/Candidate-info`,
  },
  {
    label: "Notes",
    Icon: FaCommentAlt,
    Pathname: "Notes",
    path: (job_id: string, CandidateId: string) =>
      `/Hiring/jobs/${job_id}/profile/${CandidateId}/Notes`,
  },
  {
    label: "Emails",
    Icon: LuMail,
    Pathname: "Emails",
    path: (job_id: string, CandidateId: string) =>
      `/Hiring/jobs/${job_id}/profile/${CandidateId}/Emails`,
  },
];

export interface CandidateProfileRoutesType {
  label: string;
  Pathname: string;
  Icon: IconType;
  path: (job_id: string, CandidateId: string) => string;
}

export const VisibleDetailsCandidate = [
  "Zip",
  "City",
  "Desired Pay",
  "LinkedIn URL",
  "Date available",
  "Email",
];
