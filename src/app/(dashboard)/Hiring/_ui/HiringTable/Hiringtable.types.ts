export interface HiringTableType {
  id: string;
  Candiates: number;
  NewCandidates: number;
  job_opening: string;
  hiring_lead: string;
  CreatedOn: string;
  department: string;
  Location: string;
  status: string;
}

export interface HiringPropsType {
  Hiring: HiringTableType[];
}

export interface statusOptionsType {
  name: string;
  uid: string;
}