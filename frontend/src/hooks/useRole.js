import { useQuery } from "@tanstack/react-query";
import { getRole } from "../api/roleApi";

export const useRole = (id) =>
  useQuery({
    queryKey: ["role", id],
    queryFn: () => getRole(id),
    enabled: !!id
  });
