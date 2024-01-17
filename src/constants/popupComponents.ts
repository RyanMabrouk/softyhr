import DeleteEducation from "@/app/_ui/_PopUp/components/Education/DeleteEducation/DeleteEducation";
import AddEntry from "@/app/_ui/_PopUp/components/TableEntries/AddEntry/AddEntry";
import EditEntry from "@/app/_ui/_PopUp/components/TableEntries/EditEntry/EditEntry";
import DeleteItem from "@/app/_ui/_PopUp/components/TableEntries/DeleteEntry/DeleteItem";
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
};
