export type CheckedStatus = {
  label: string;
  value: string;
};

export type GlobalFilterState = {
  jobStatus: string[];
  jobName: string[];
  jobSourse: string[];
  jobLocation: string[];
  hiringLeader: string[];
};
export type GlobalRangeState = {
  ratings: rangeType;
  dates: rangeType;
};

export type rangeType = {
  min: string | number;
  max: string | number;
};
