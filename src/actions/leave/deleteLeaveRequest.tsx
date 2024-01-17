"use server";
import deleteData from "@/api/deleteData";
export default async function deleteLeaveRequest({
  request_id,
}: {
  request_id: number;
}) {
  const { error } = await deleteData("leave_requests", {
    match: { id: request_id },
  });
  if (error) {
    return {
      error: {
        message: error.message,
        type: "Server Error : Failed to Delete Leave Request",
      },
    };
  }
  return { error: null };
}
