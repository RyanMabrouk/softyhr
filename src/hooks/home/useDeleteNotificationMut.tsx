"use client";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import deleteNotifications from "@/actions/home/deleteNotifications";

export function useDeleteNotificationMut(): {
  deleteNotification: UseMutateFunction<void, Error, number, unknown>;
  isPending: boolean;
} {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: deleteNotification, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await deleteNotifications({ id });
      if (error) {
        toast.error(error.message, error.description);
      } else {
        toast.success("Success", "Notification deleted successfully");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", "user"] });
    },
  });
  return {
    deleteNotification,
    isPending,
  };
}
