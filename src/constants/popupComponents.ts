import AdjustLeavePolicyBalance from "@/app/_ui/_PopUp/components/AdjustLeavePolicyBalance/AdjustLeavePolicyBalance";
import DeleteEducation from "@/app/_ui/_PopUp/components/DeleteEducation/DeleteEducation";
import DeleteLeaveRequest from "@/app/_ui/_PopUp/components/DeleteLeaveRequest/DeleteLeaveRequest";
import EditFields from "@/app/_ui/_PopUp/components/EditFields/EditFields";
import EditLeaveRequest from "@/app/_ui/_PopUp/components/EditLeaveRequest/EditLeaveRequest";
import RejectLeaveRequest from "@/app/_ui/_PopUp/components/RejectLeaveRequest/RejectLeaveRequest";
import ViewLeaveRequestComment from "@/app/_ui/_PopUp/components/ViewLeaveRequestComment.tsx/ViewLeaveRequestComment";
import { PopupType } from "@/types/userInfoTypes.type";

export const popups: any = {
  EDIT_FIELD: EditFields,
  EDIT_LEAVE_REQUEST: EditLeaveRequest,
  DELETE_EDUCATION: DeleteEducation,
  RJECT_LEAVE_REQUEST: RejectLeaveRequest,
  VIEW_LEAVE_REQUEST_COMMENT: ViewLeaveRequestComment,
  ADJUST_LEAVE_POLICY_BALANCE: AdjustLeavePolicyBalance,
  DELETE_LEAVE_REQUEST: DeleteLeaveRequest,
};
