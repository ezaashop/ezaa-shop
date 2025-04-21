// hooks/useCashback.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTransactionPool,
  getCashbackInfo,
  getWalletTotal,
  requestPayment,
  getRequestInfo,
  getTotalCommission,
  PaymentRequestData,
} from "@/services/cashbackService";

// Queries
export const useTransactionPool = (userId: string) =>
  useQuery({
    queryKey: ["transactionPool", userId],
    queryFn: () => getTransactionPool(userId),
    enabled: !!userId,
  });

export const useCashbackInfo = (userId: string) =>
  useQuery({
    queryKey: ["cashbackInfo", userId],
    queryFn: () => getCashbackInfo(userId),
    enabled: !!userId,
  });

export const useWalletTotal = (userId: string) =>
  useQuery({
    queryKey: ["walletTotal", userId],
    queryFn: () => getWalletTotal(userId),
    enabled: !!userId,
  });

export const useRequestInfo = (userId: string) =>
  useQuery({
    queryKey: ["requestInfo", userId],
    queryFn: () => getRequestInfo(userId),
    enabled: !!userId,
  });

export const useTotalCommission = (userId: string) =>
  useQuery({
    queryKey: ["totalCommission", userId],
    queryFn: () => getTotalCommission(userId),
    enabled: !!userId,
  });

// Mutation
export const useRequestPayment = (userId: string) =>
  useMutation({
    mutationFn: (data: PaymentRequestData) => requestPayment(userId, data),
  });
