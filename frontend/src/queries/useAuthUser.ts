"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../utils/get-me";

export function useAuthUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false,
  });
}
