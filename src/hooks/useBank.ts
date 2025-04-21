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
export const useCreateBank = (userId: string) =>
  useMutation({
    mutationFn: (data: BankAccountData) => createBank(userId, data),
  });

// Read
export const useGetBank = (userId: string) =>
  useQuery({
    queryKey: ["bank", userId],
    queryFn: () => getBank(userId),
    enabled: !!userId,
  });

// Update
export const useUpdateAccount = (userId: string) =>
  useMutation({
    mutationFn: (data: BankAccountData) => updateAccount(userId, data),
  });

// Delete
export const useDeleteAccount = (userId: string) =>
  useMutation({
    mutationFn: () => deleteAccount(userId),
  });

// Update Status
export const useUpdateAccountStatus = (accountId: string) =>
  useMutation({
    mutationFn: () => updateAccountStatus(accountId),
  });
