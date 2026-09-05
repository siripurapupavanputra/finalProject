import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole, updateRole, activateRole, deactivateRole } from "../api/roleApi";

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] })
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }) => updateRole(id, role),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role", data.id] });
    }
  });
};

export const useActivateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role", data.role.id] });
    }
  });
};

export const useDeactivateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["role", data.role.id] });
    }
  });
};
