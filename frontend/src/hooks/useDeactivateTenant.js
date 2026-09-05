import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import { deactivateTenant } from "../api/tenantApi";

export const useDeactivateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateTenant,

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