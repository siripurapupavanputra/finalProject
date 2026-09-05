import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import { activateTenant } from "../api/tenantApi";

export const useActivateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateTenant,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"]
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", data.tenant.id]
      });
    }
  });
};