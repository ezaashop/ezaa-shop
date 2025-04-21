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

export const createBank = (userId: string, data: BankAccountData) =>
  asyncHandler(() =>
    api.post(`/createBank/${userId}`, data).then((res) => res.data)
  );

export const getBank = (userId: string) =>
  asyncHandler(() =>
    api.get(`/getBank/${userId}`).then((res) => res.data)
  );

export const updateAccount = (userId: string, data: BankAccountData) =>
  asyncHandler(() =>
    api.post(`/updateAccount/${userId}`, data).then((res) => res.data)
  );

export const deleteAccount = (userId: string) =>
  asyncHandler(() =>
    api.delete(`/deleteAccount/${userId}`).then((res) => res.data)
  );

export const updateAccountStatus = (accountId: string) =>
  asyncHandler(() =>
    api.get(`/updateAccountStatus/${accountId}`).then((res) => res.data)
  );
