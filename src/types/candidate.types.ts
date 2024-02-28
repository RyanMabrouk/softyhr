export interface email_history_type {
  email_object?: string;
  created_at?: string;
} 
export interface CandidateType {
  created_at: string;
  Email: string | null;
  "First Name": string | null;
  "Hiring Lead": string | null;
  id: string;
  job_id: number | null;
  "Last Name": string | null;
  metadata: ObjectOfString;
  org_name: string | null;
  Phone: string | null;
  Ratings: number | null;
  status: string | null;
  candidate_emails?: any;
  user_emails?:any;
  Questions?:Object;
}

interface ObjectOfString {
  [key: string]: string;
}

export interface insert_CandidateType {
  created_at?: string;
  Email: string | null;
  "First Name": string | null;
  "Hiring Lead"?: string | null;
  id: number;
  job_id: number | null;
  "Last Name"?: string | null;
  metadata?: ObjectOfString | null;
  org_name: string | null;
  Phone?: string | null;
  Ratings?: number | null;
  status?: string | null;
}
