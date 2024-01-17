import AdjustLeavePolicyBalance from "@/app/_ui/_PopUp/components/AdjustLeavePolicyBalance/AdjustLeavePolicyBalance";
import DeleteEducation from "@/app/_ui/_PopUp/components/DeleteEducation/DeleteEducation";
import DeleteLeaveRequest from "@/app/_ui/_PopUp/components/DeleteLeaveRequest/DeleteLeaveRequest";
import EditFields from "@/app/_ui/_PopUp/components/EditFields/EditFields";
import EditLeaveRequest from "@/app/_ui/_PopUp/components/EditLeaveRequest/EditLeaveRequest";
import RejectLeaveRequest from "@/app/_ui/_PopUp/components/RejectLeaveRequest/RejectLeaveRequest";
import ViewLeaveRequestComment from "@/app/_ui/_PopUp/components/ViewLeaveRequestComment.tsx/ViewLeaveRequestComment";
import EditTablechamps from "@/app/_ui/_PopUp/components/EditTablechamps/EditTablechamps";
import { PopupType } from "@/types/userInfoTypes.type";
import NewFolderPopUp from "@/app/(dashboard)/Files/_ui/popUp/NewFolderPopUp";
import UploadFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/UploadFilePopUp";
import DeleteFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/DeleteFilePopUp";
import RenameFolderPopUp from "@/app/(dashboard)/Files/_ui/popUp/RenameFolderPopUp";
import DeleteFolderPopUp from "@/app/(dashboard)/Files/_ui/popUp/DeleteFolderPopUp";
import RenameFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/RenameFilePopUp";
import SendEmailFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/SendEmailFilePopUp";
import ShareFilePopUp from "@/app/(dashboard)/Files/_ui/popUp/ShareFilePopUp";
import ShareFolderPopUp from "@/app/(dashboard)/Files/_ui/popUp/ShareFolderPopUp";

export const popups: any = {
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
};
