import { ReactNode } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import getData from "@/api/getData";
interface EmployeesPropsType {
  children: ReactNode;
  params: { employeeId: string };
}
export default function layout({ children, params }: EmployeesPropsType) {
  return (
    <EpmloyeeHydration employeeId={params.employeeId}>
      {children}
    </EpmloyeeHydration>
  );
}
async function EpmloyeeHydration({
  children,
  employeeId,
}: {
  children: ReactNode;
  employeeId: string;
}) {
  const queryClient = new QueryClient();
  if (employeeId && employeeId !== "null") {
    await queryClient.prefetchQuery({
      queryKey: ["leave_requests", employeeId],
      queryFn: () =>
        getData("leave_requests", {
          match: { user_id: employeeId },
          org: true,
        }),
    });
    await queryClient.prefetchQuery({
      queryKey: ["profiles", employeeId],
      queryFn: () =>
        getData("profiles", {
          match: { user_id: employeeId },
          org: true,
        }),
    });
    await queryClient.prefetchQuery({
      queryKey: ["leave_accrued", employeeId],
      queryFn: () =>
        getData("leave_accrued", {
          match: { user_id: employeeId },
          org: true,
        }),
    });
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
