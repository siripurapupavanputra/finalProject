import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/userApi";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });
