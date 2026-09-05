import { useQuery } from "@tanstack/react-query";
import { getRecentActivities } from "../api/dashboardApi";

export const useRecentActivities = () => {
  return useQuery({
    queryKey: ["recentActivities"],
    queryFn: getRecentActivities
  });
};