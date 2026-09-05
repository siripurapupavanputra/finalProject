import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrganization,
  updateOrganization,
  activateOrganization,
  deactivateOrganization
} from "../api/organizationApi";

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrganization,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["organizations"] })
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, organization }) => updateOrganization(id, organization),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organization", data.id] });
    }
  });
};

export const useActivateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateOrganization,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organization", data.organization.id] });
    }
  });
};

export const useDeactivateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateOrganization,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organization", data.organization.id] });
    }
  });
};
