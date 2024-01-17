import { TiClipboard } from "react-icons/ti";
import { RxAvatar } from "react-icons/rx";
import { RiUserStarFill } from "react-icons/ri";
import { IconType } from "react-icons";
import { FaCircleUser } from "react-icons/fa6";

export const HirinSections = [
  { label: "Job Opening", path: "/Hiring/jobs", Icon: "TICLIPBOARD" },
  { label: "Candidates", path: "/Hiring/candidates", Icon: "FACIRCLEUSER" },
  {
    label: "Talent Pools",
    path: "/Hiring/talent-pools",
    Icon: "RIUSERSTARFILL",
  },
];

export interface HirinSectionsType {
  label: string;
  path: string;
  Icon: string;
}

type HirinIconsType<T> = {
  [key: string]: T;
};

export const HirinIcons: HirinIconsType<IconType> = {
  TICLIPBOARD: TiClipboard,
  FACIRCLEUSER: FaCircleUser,
  RIUSERSTARFILL: RiUserStarFill,
};
export const CreateHiringJob = [
  "Information-Job",
  "Application-Details",
  "Job-Boards",
];

export const HiringInfos : HiringInfosType[]= [
  {label:"Location",name:"Job Location" },
  {label:"Department",name:"Departement" },
  {label:"Employment Type",name:"Employment Type" },
  {label:"Minimum Experience",name:"Minimum Experience" }
]
export type HiringInfosType = {
  label:string;
  name:string;
}

export const FieldsAplyment = [
  {
     name: "Country",
     type: "text",
     required: true
  },
  {
     name: "Country",
     type: "text",
     required: true
  }
]


export const InformationJob_inputs = [
  {RowField:{name:"Job Location", type:'text'}},
  {RowField:{name:"Job Description", type:'textarea'}},
  {RowField:{name:"Internal Job Code", type:'text'}},
]