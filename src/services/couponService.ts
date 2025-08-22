// services/couponService.ts
import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

export type CheckCouponData = {
  coupoun_code: string;
  amount?: number;
};

export const createCouponCode = (userId: number, data: {amount: number}) =>
  asyncHandler(() =>
    api.post(`/createCouponCode/${userId}`, data).then((res) => res.data)
  );

export const getCouponCodes = (userId: number) =>
  asyncHandler(() =>
    api.get(`/getCouponCode/${userId}`).then((res) => res.data)
  );

export const checkCouponCode = (userId: number, data: CheckCouponData) =>
  asyncHandler(() =>
    api.post(`/checkCouponCode/${userId}`, data).then((res) => res.data)
  );
