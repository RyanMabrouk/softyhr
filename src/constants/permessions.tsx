import { BsFillStopwatchFill, BsPeopleFill } from "react-icons/bs";
import { FaAddressCard, FaBusinessTime, FaSuitcase } from "react-icons/fa";
import { FaFileShield } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

export const permissions = [
  {
    icon: <FaFileShield className=" h-5 w-5" />,

    label: "Company Files",
    permissions: [
      { permession: "read:files", label: "Read all files" },
      { permession: "delete:files", label: "Delete files" },
      { permession: "share:files", label: "Share files" },
      { permession: "upload:files", label: "Upload files" },
      {
        permession: "access:employee_files",
        label: "Access only shared files",
        description: "Allow role to access shared files only",
        default: true,
      },
    ],
  },
  {
    icon: <BsFillStopwatchFill className=" h-5 w-5" />,
    label: "Time Off",
    permissions: [
      { permession: "accept:leave_requests", label: "Accept leave requests" },
      { permession: "deny:leave_requests", label: "Deny leave requests" },
      {
        permession: "view:leave_requests_note",
        label: "View leave requests note",
      },
      {
        permession: "edit:approved_leave_requests",
        label: "Edit approved leave requests",
      },
      { permession: "delete:leave_requests", label: "Delete leave requests" },
      { permession: "adjust:leave_balance", label: "Adjust leave balance" },
    ],
  },
  {
    icon: <IoSettings className=" h-5 w-5" />,
    label: "Settings",
    permissions: [
      {
        permession: "access:/Settings/AccessLevels",
        label: "Manage Access Levels",
      },
      { permession: "access:/Settings/TimeOff", label: "Manage Time off" },
      {
        permission: "access:/Settings/Jobs",
        label: "Manage Jobs",
      },
    ],
  },
  {
    icon: <BsPeopleFill className=" h-5 w-5" />,
    label: "Employees",
    permissions: [
      {
        permession: "add:employee",
        label: "Add New Employees",
      },
    ],
  },
];
// permissions of the Profile
export const feildsPermissions = [
  {
    label: "Personnal",
    icon: <FaAddressCard className="h-8 w-8 text-fabric-700" />,
    permissions: [
      // not in use
      // edit must override read !!
      "edit:Address",
      "read:Address",
      "edit:Basic Info",
      "read:Basic Info",
      "edit:Contact",
      "read:Contact",
      "edit:Social Links",
      "read:Social Links",
      "edit:Education",
      "read:Education",
      "edit:Visa Information",
      "read:Visa Information",
      "edit:Driver License",
      "read:Driver License",
    ],
  },
  {
    label: "Job",
    icon: <FaSuitcase className="h-8 w-8 text-fabric-700" />,
    permissions: [
      // not in use
      // edit must override read !!
      "edit:Compensation",
      "read:Compensation",
      "edit:Employment Status",
      "read:Employment Status",
      "edit:Job Information",
      "read:Job Information",
      "edit:Bonus",
      "read:Bonus",
      "edit:Hire Date",
      "read:Hire Date",
    ],
  },
  {
    label: "Time Off",
    icon: <FaBusinessTime className="h-8 w-8 text-fabric-700" />,
    permissions: [
      "read:Employees policies",
      "read:Employees upcoming time off",
      "read:Employees history",
    ],
  },
];
// allow user to read his profile (my info)
const myInfopermissions = ["read:My Info"]; // not in use
