// hooks/useCoupon.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCouponCode,
  getCouponCodes,
  checkCouponCode,
  CheckCouponData,
} from "@/services/couponService";

// Create
export const useCreateCoupon = (userId: number) =>
  useMutation({
    mutationFn: (data: { amount: number }) => createCouponCode(userId, data),
  });

// Get
export const useCouponCodes = (userId: number) =>
  useQuery({
    queryKey: ["couponCodes", userId],
    queryFn: () => getCouponCodes(userId),
    enabled: !!userId,
  });

// Check
export const useCheckCoupon = (userId: number) =>
  useMutation({
    mutationFn: (data: CheckCouponData) => checkCouponCode(userId, data),
  });
