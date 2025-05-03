// services/bankService.ts
import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

export type BankAccountData = {
  account_name: string;
  account_number: string;
  ifsc_code: string;
  bank_name: string;
  branch_name?: string;
  upi_id?: string;
};

export const createBank = (userId: number, data: BankAccountData) =>
  asyncHandler(() =>
    api.post(`/createBank/${userId}`, data).then((res) => res.data)
  );

export const getBank = (userId: number) =>
  asyncHandler(() => api.get(`/getBank/${userId}`).then((res) => res.data));

export const updateAccount = (userId: number, data: BankAccountData) =>
  asyncHandler(() =>
    api.post(`/updateAccount/${userId}`, data).then((res) => res.data)
  );

export const deleteAccount = (userId: number) =>
  asyncHandler(() =>
    api.delete(`/deleteAccount/${userId}`).then((res) => res.data)
  );

export const updateAccountStatus = (accountId: number) =>
  asyncHandler(() =>
    api.get(`/updateAccountStatus/${accountId}`).then((res) => res.data)
  );
