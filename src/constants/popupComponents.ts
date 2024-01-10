import DeleteEducation from "@/app/_ui/_PopUp/components/DeleteEducation/DeleteEducation";
import EditFields from "@/app/_ui/_PopUp/components/EditFields/EditFields";
import EditLeaveRequest from "@/app/_ui/_PopUp/components/EditLeaveRequest/EditLeaveRequest";
import EditTablechamps from "@/app/_ui/_PopUp/components/EditTablechamps/EditTablechamps";
import { PopupType } from "@/types/userInfoTypes.type";

export const popups: any = {
  EDIT_FIELD: EditFields,
  EDIT_LEAVE_REQUEST: EditLeaveRequest,
  DELETE_EDUCATION: DeleteEducation,
  EDIT_:EditTablechamps
};
