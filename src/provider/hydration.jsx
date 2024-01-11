import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import getData from "@/api/getData";

export default async function Hydration({ children }) {
  const queryClient = new QueryClient();
 /* await queryClient.prefetchQuery({
    queryKey: ["leave_requests"],
    queryFn: () =>
      getData("leave_requests", {
        user: true,
        org: true,
      }),
  });
  await queryClient.prefetchQuery({
    queryKey: ["leave_policies"],
    queryFn: () =>
      getData("leave_policies", {
        org: true,
      }),
  });
  await queryClient.prefetchQuery({
    queryKey: ["leave_accrued"],
    queryFn: () =>
      getData("leave_accrued", {
        user: true,
        org: true,
      }),
  });*/
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
