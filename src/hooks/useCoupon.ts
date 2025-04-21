// hooks/useCoupon.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCouponCode,
  getCouponCodes,
  checkCouponCode,
  CreateCouponData,
  CheckCouponData,
} from "@/services/couponService";

// Create
export const useCreateCoupon = (userId: string) =>
  useMutation({
    mutationFn: (data: CreateCouponData) => createCouponCode(userId, data),
  });

// Get
export const useCouponCodes = (userId: string) =>
  useQuery({
    queryKey: ["couponCodes", userId],
    queryFn: () => getCouponCodes(userId),
    enabled: !!userId,
  });

// Check
export const useCheckCoupon = (userId: string) =>
  useMutation({
    mutationFn: (data: CheckCouponData) => checkCouponCode(userId, data),
  });
