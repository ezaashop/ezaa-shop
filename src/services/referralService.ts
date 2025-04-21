// services/referralService.ts
import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

// Get user's referral code
export const getReferralCode = (userId: string) =>
  asyncHandler(() => api.get(`/showCode/${userId}`).then(res => res.data));

// Get user's direct team
export const getUserTeam = (userId: string) =>
  asyncHandler(() => api.get(`/getUserTeam/${userId}`).then(res => res.data));

// Get all levels of user's team
export const getAllUserTeams = (userId: string) =>
  asyncHandler(() => api.get(`/getAllUserTeams/${userId}`).then(res => res.data));
