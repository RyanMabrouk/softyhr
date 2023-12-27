import { FaAddressCard } from "react-icons/fa";

export const EmployeeRoute = [
  {
    rang: 1,
    label: "personnal",
    path: (employeId: string) => `/people/${employeId}/personnal`,
    defaultPath: true,
    icon: FaAddressCard,
  },
  {
    rang: 4,
    label: "job",
    path: (employeId: string) => `/people/${employeId}/job`,
    defaultPath: true,
  },
  {
    rang: 3,
    label: "emploi",
    path: (employeId: string) => `/people/${employeId}/emploi`,
    defaultPath: true,
  },
  {
    rang: 2,
    label: "Avantages",
    path: (employeId: string) => `/people/${employeId}/Avantages`,
    defaultPath: true,
  },
  {
    rang: 5,
    label: "leave",
    path: (employeId: string) => `/people/${employeId}/leave`,
    defaultPath: true,
  },
  {
    rang: 6,
    label: "Documents",
    path: (employeId: string) => `/people/${employeId}/Documents`,
    defaultPath: true,
  },
  {
    rang: 7,
    label: "Actifs",
    path: (employeId: string) => `/people/${employeId}/Actifs`,
    defaultPath: true,
  },
  {
    rang: 8,
    label: "COVID-19",
    path: (employeId: string) => `/people/${employeId}/COVID-19`,
    defaultPath: true,
  },
];

export interface EmployeRoutesType {
  rang: number;
  label: string;
  path: (arg: string) => string;
  defaultPath: boolean;
}
