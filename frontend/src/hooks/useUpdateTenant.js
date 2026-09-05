import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import { updateTenant } from "../api/tenantApi";

export const useUpdateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, tenant }) =>
      updateTenant(id, tenant),

    onSuccess: (updatedTenant) => {

      queryClient.invalidateQueries({
        queryKey: ["tenants"]
      });

      queryClient.invalidateQueries({
        queryKey: ["tenant", updatedTenant.id]
      });
    }
  });
};