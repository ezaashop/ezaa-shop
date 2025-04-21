// hooks/useReferral.ts
import { useQuery } from "@tanstack/react-query";
import {
  getReferralCode,
  getUserTeam,
  getAllUserTeams,
} from "@/services/referralService";

export const useReferralCode = (userId: string) =>
  useQuery({
    queryKey: ["referralCode", userId],
    queryFn: () => getReferralCode(userId),
    enabled: !!userId,
  });

export const useUserTeam = (userId: string) =>
  useQuery({
    queryKey: ["userTeam", userId],
    queryFn: () => getUserTeam(userId),
    enabled: !!userId,
  });

export const useAllUserTeams = (userId: string) =>
  useQuery({
    queryKey: ["allUserTeams", userId],
    queryFn: () => getAllUserTeams(userId),
    enabled: !!userId,
  });
