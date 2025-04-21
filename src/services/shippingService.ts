// services/shippingService.ts
import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

export type ShippingAddressData = {
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone_number: string;
  is_default?: boolean;
  recipient_name: string;
};

// Create shipping address
export const createShippingAddress = (userId: string, data: ShippingAddressData) =>
  asyncHandler(() => api.post(`/createShippingAddress/${userId}`, data).then(res => res.data));

// Get all shipping addresses
export const getShippingAddresses = (userId: string) =>
  asyncHandler(() => api.get(`/getShippingAddress/${userId}`).then(res => res.data));

// Set address as default
export const updateShippingAddressStatus = (userId: string, addressId: string) =>
  asyncHandler(() =>
    api.get(`/updateShippingAddressStatus/${userId}?address_id=${addressId}`).then(res => res.data)
  );

// Update shipping address
export const updateShippingAddress = (addressId: string, data: ShippingAddressData) =>
  asyncHandler(() => api.post(`/updateShippingAddress/${addressId}`, data).then(res => res.data));
