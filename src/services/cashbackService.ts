// services/cashbackService.ts
import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

export type PaymentRequestData = {
  amount: number;
  account_id: string;
};

export const getTransactionPool = (userId: number) =>
  asyncHandler(() =>
    api.get(`/userTransactionPool/${userId}`).then((res) => res.data)
  );

export const getCashbackInfo = (userId: number) =>
  asyncHandler(() =>
    api.get(`/userCashBackInfo/${userId}`).then((res) => res.data)
  );

export const getWalletTotal = (userId: number) =>
  asyncHandler(() =>
    api.get(`/getWalletTotalAmount/${userId}`).then((res) => res.data)
  );

export const requestPayment = (userId: number, data: PaymentRequestData) =>
  asyncHandler(() =>
    api.post(`/userPaymentRequest/${userId}`, data).then((res) => res.data)
  );

export const getRequestInfo = (userId: number) =>
  asyncHandler(() =>
    api.get(`/getUserRequestInfo/${userId}`).then((res) => res.data)
  );

export const getUserTotalCommission = (userId: number) =>
  asyncHandler(() =>
    api.get(`/getUserTotalCommission/${userId}`).then((res) => res.data)
  );
