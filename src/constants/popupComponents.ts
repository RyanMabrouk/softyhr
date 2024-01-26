import DeleteEducation from "@/app/_ui/_PopUp/components/Personel-job/Education/DeleteEducation/DeleteEducation";
import AddEntry from "@/app/_ui/_PopUp/components/Personel-job/TableEntries/AddEntry/AddEntry";
import EditEntry from "@/app/_ui/_PopUp/components/Personel-job/TableEntries/EditEntry/EditEntry";
import DeleteItem from "@/app/_ui/_PopUp/components/Personel-job/TableEntries/DeleteEntry/DeleteItem";
import EditPhoto from "@/app/_ui/_PopUp/components/EditPhoto/EditPhoto";
import DeleteLeaveRequest from "@/app/_ui/_PopUp/components/TimeOff/DeleteLeaveRequest/DeleteLeaveRequest";
import EditFields from "@/app/_ui/_PopUp/components/Personel-job/EditFields/EditFields";
import NewFolderPopUp from "@/app/(dashboard)/Files/_ui/popUp/NewFolderPopUp";
import UploadFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/UploadFilePopUp";
import DeleteFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/DeleteFilePopUp";
import RenameFolderPopUp from "@/app/(dashboard)/Files/_ui/popUp/RenameFolderPopUp";
import DeleteFolderPopUp from "@/app/(dashboard)/Files/_ui/popUp/DeleteFolderPopUp";
import RenameFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/RenameFilePopUp";
import SendEmailFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/SendEmailFilePopUp";
import ShareFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/ShareFilePopUp";
import ShareFolderPopUp from "@/app/(dashboard)/Files/_ui/popUp/ShareFolderPopUp";
import DeleteLeavePolicy from "@/app/_ui/_PopUp/components/TimeOff/DeleteLeavePolicy/DeleteLeavePolicy";
import AddTimeOffPolicy from "@/app/_ui/_PopUp/components/TimeOff/AddTimeOffPolicy/AddTimeOffPolicy";
import AccrualStartDate from "@/app/_ui/_PopUp/components/TimeOff/AccrualStartDate/AccrualStartDate";
import ChangeLeavePolicy from "@/app/_ui/_PopUp/components/TimeOff/ChangeLeavePolicy/ChangeLeavePolicy";
import EditLeaveRequest from "@/app/_ui/_PopUp/components/TimeOff/EditLeaveRequest/EditLeaveRequest";
import RejectLeaveRequest from "@/app/_ui/_PopUp/components/TimeOff/RejectLeaveRequest/RejectLeaveRequest";
import ViewLeaveRequestComment from "@/app/_ui/_PopUp/components/TimeOff/ViewLeaveRequestComment.tsx/ViewLeaveRequestComment";
import AdjustLeavePolicyBalance from "@/app/_ui/_PopUp/components/TimeOff/AdjustLeavePolicyBalance/AdjustLeavePolicyBalance";
import ChangeDefaultHoursPerDay from "@/app/_ui/_PopUp/components/Settings/TimeOff/ChangeDefaultHoursPerDay/ChangeDefaultHoursPerDay";
import EditLeaveCategory from "@/app/_ui/_PopUp/components/Settings/TimeOff/EditLeaveCategory/EditLeaveCategory";
import DisableLeaveCategory from "@/app/_ui/_PopUp/components/Settings/TimeOff/DisableLeaveCategory/DisableLeaveCategory";
import DeleteLeaveCategory from "@/app/_ui/_PopUp/components/Settings/TimeOff/DeleteLeaveCategory/DeleteLeaveCategory";
import EnableLeaveCategory from "@/app/_ui/_PopUp/components/Settings/TimeOff/EnableLeaveCategory/EnableLeaveCategory";
import RenamePolicy from "@/app/_ui/_PopUp/components/Settings/TimeOff/RenamePolicy/RenamePolicy";
import DeleteLeavePolicyData from "@/app/_ui/_PopUp/components/Settings/TimeOff/DeleteLeavePolicy/DeleteLeavePolicyData";
import AddNewPolicy from "@/app/_ui/_PopUp/components/Settings/TimeOff/AddNewPolicy/AddNewPolicy";
import AddEmployeesToPolicy from "@/app/_ui/_PopUp/components/Settings/TimeOff/AddEmployeesToPolicy/AddEmployeesToPolicy";

type PopupType = {
  [key: string]: () => React.JSX.Element;
};
export const popups: PopupType = {
  EDIT_FIELD: EditFields,
  EDIT_LEAVE_REQUEST: EditLeaveRequest,
  DELETE_EDUCATION: DeleteEducation,
  RJECT_LEAVE_REQUEST: RejectLeaveRequest,
  VIEW_LEAVE_REQUEST_COMMENT: ViewLeaveRequestComment,
  ADJUST_LEAVE_POLICY_BALANCE: AdjustLeavePolicyBalance,
  DELETE_LEAVE_REQUEST: DeleteLeaveRequest,
  ADD_FOLDER: NewFolderPopUp,
  UPLOAD_FILE: UploadFilePopUp,
  DELETE_FILE: DeleteFilePopUp,
  RENAME_FILE: RenameFilePopUp,
  RENAME_FOLDER: RenameFolderPopUp,
  SHARE_FOLDER: ShareFolderPopUp,
  DELETE_FOLDER: DeleteFolderPopUp,
  SEND_EMAIL_FILE: SendEmailFilePopUp,
  SHARE_FILE: ShareFilePopUp,
  CHANGE_LEAVE_POLICY: ChangeLeavePolicy,
  DELETE_LEAVE_POLICY: DeleteLeavePolicy,
  ADD_ENTRY: AddEntry,
  EDIT_ENTRY: EditEntry,
  DELETE_ENTRY: DeleteItem,
  EDIT_PROFILE_IMAGE: EditPhoto,
  ADD_TIME_OFF_POLICY: AddTimeOffPolicy,
  CHANGE_ACCURAL_START_DATE: AccrualStartDate,
  CHANGE_DEFAULT_HOURS_PER_DAY: ChangeDefaultHoursPerDay,
  EDIT_LEAVE_CATEGORY: EditLeaveCategory,
  DISABLE_LEAVE_CATEGORY: DisableLeaveCategory,
  DELETE_LEAVE_CATEGORY: DeleteLeaveCategory,
  ENABLE_LEAVE_CATEGORY: EnableLeaveCategory,
  EDIT_POLICY_NAME: RenamePolicy,
  DELETE_LEAVE_POLICY_DATA: DeleteLeavePolicyData,
  ADD_NEW_POLICY: AddNewPolicy,
  ADD_EMPLOYEES_TO_POLICY: AddEmployeesToPolicy,
};
