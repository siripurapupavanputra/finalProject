import { useQuery } from "@tanstack/react-query";
import { getTenant } from "../api/tenantApi";

export const useTenant = (id) => {
  return useQuery({
    queryKey: ["tenant", id],
    queryFn: () => getTenant(id),
    enabled: !!id
  });
};