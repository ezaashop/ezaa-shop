// hooks/useShipping.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createShippingAddress,
  getShippingAddresses,
  updateShippingAddressStatus,
  updateShippingAddress,
  ShippingAddressData,
} from "@/services/shippingService";

export const useShippingAddresses = (userId: string) =>
  useQuery({
    queryKey: ["shippingAddresses", userId],
    queryFn: () => getShippingAddresses(userId),
    enabled: !!userId,
  });

export const useCreateShippingAddress = () =>
  useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: ShippingAddressData }) =>
      createShippingAddress(userId, data),
  });

export const useUpdateShippingAddressStatus = () =>
  useMutation({
    mutationFn: ({ userId, addressId }: { userId: string; addressId: string }) =>
      updateShippingAddressStatus(userId, addressId),
  });

export const useUpdateShippingAddress = () =>
  useMutation({
    mutationFn: ({ addressId, data }: { addressId: string; data: ShippingAddressData }) =>
      updateShippingAddress(addressId, data),
  });
