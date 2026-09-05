import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "../api/organizationApi";

export const useOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations
  });
