// services/couponService.ts
import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

export type CreateCouponData = {
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_purchase_amount?: number;
  max_discount_amount?: number;
  expiry_date?: string;
  description?: string;
};

export type CheckCouponData = {
  coupoun_code: string;
  amount?: number;
};

export const createCouponCode = (userId: number, data: CreateCouponData) =>
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
