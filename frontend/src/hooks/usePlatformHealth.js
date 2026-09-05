import { useQuery } from "@tanstack/react-query";
import { getPlatformHealth } from "../api/dashboardApi";

export const usePlatformHealth = () => {
  return useQuery({
    queryKey: ["platformHealth"],
    queryFn: getPlatformHealth
  });
};