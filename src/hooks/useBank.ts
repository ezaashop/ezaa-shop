// hooks/useBank.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createBank,
  getBank,
  updateAccount,
  deleteAccount,
  updateAccountStatus,
  BankAccountData,
} from "@/services/bankService";

// Create
export const useCreateBank = (userId: number) =>
  useMutation({
    mutationFn: (data: BankAccountData) => createBank(userId, data),
  });

// Read
export const useGetBank = (userId: number) =>
  useQuery({
    queryKey: ["bank", userId],
    queryFn: () => getBank(userId),
    enabled: !!userId,
  });

// Update
export const useUpdateAccount = (accountId: number) =>
  useMutation({
    mutationFn: (data: BankAccountData) => updateAccount(accountId, data),
  });

// Update Status
export const useUpdateAccountStatus = (accountId: number) =>
  useMutation({
    mutationFn: () => updateAccountStatus(accountId),
  });
// Delete
export const useDeleteAccount = (accountId: number) =>
  useMutation({
    mutationFn: () => deleteAccount(accountId),
  });