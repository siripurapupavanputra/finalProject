import { useQuery } from "@tanstack/react-query";
import { getOrganization } from "../api/organizationApi";

export const useOrganization = (id) =>
  useQuery({
    queryKey: ["organization", id],
    queryFn: () => getOrganization(id),
    enabled: !!id
  });
