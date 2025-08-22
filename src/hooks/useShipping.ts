// hooks/useShipping.ts
import {
  createShippingAddress,
  getShippingAddresses,
  updateShippingAddress,
  updateShippingAddressStatus,
} from "@/services/shippingService";
import { useMutation, useQuery } from "@tanstack/react-query";

// addCart api

export const useShippingAddresses = (userId: string) =>
  useQuery({
    queryKey: ["shippingAddresses", userId],
    queryFn: () => getShippingAddresses(userId),
    enabled: !!userId,
  });

export const useCreateShippingAddress = () =>
  useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: any }) =>
      createShippingAddress(userId, data),
  });

export const useUpdateShippingAddressStatus = () =>
  useMutation({
    mutationFn: ({ userId, addressId }: { userId: string; addressId: string }) =>
      updateShippingAddressStatus(userId, addressId),
  });

export const useUpdateShippingAddress = () =>
  useMutation({
    mutationFn: ({ addressId, data }: { addressId: string; data: any }) =>
      updateShippingAddress(addressId, data),
  });
