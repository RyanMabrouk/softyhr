export type CheckedStatus = {
  label: string;
  value: string;
};

export type GlobalFilterState = {
  jobStatus: string[];
  jobName: string[];
  jobSourse: string[];
  hiringLeader: string[];
};
export type GlobalRangeState = {
  ratings: rangeType;
};

export type rangeType = {
  min: string | number;
  max: string | number;
};
