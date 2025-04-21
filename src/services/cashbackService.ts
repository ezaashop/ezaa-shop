// services/cashbackService.ts
import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

export type PaymentRequestData = {
  amount: number;
  account_id: string;
};

export const getTransactionPool = (userId: string) =>
  asyncHandler(() =>
    api.get(`/userTransactionPool/${userId}`).then((res) => res.data)
  );

export const getCashbackInfo = (userId: string) =>
  asyncHandler(() =>
    api.get(`/userCashBackInfo/${userId}`).then((res) => res.data)
  );

export const getWalletTotal = (userId: string) =>
  asyncHandler(() =>
    api.get(`/getWalletTotalAmount/${userId}`).then((res) => res.data)
  );

export const requestPayment = (userId: string, data: PaymentRequestData) =>
  asyncHandler(() =>
    api.post(`/userPaymentRequest/${userId}`, data).then((res) => res.data)
  );

export const getRequestInfo = (userId: string) =>
  asyncHandler(() =>
    api.get(`/getUserRequestInfo/${userId}`).then((res) => res.data)
  );

export const getTotalCommission = (userId: string) =>
  asyncHandler(() =>
    api.get(`/getUserTotalCommission/${userId}`).then((res) => res.data)
  );
