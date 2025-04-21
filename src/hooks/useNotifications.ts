// hooks/useNotification.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCashbackNotifications,
  getCommissionNotifications,
  getAdminNotifications,
  markNotificationAsSeen,
} from "@/services/notificationService";

// Cashback
export const useCashbackNotifications = (userId: string) =>
  useQuery({
    queryKey: ["cashbackNotifications", userId],
    queryFn: () => getCashbackNotifications(userId),
    enabled: !!userId,
  });

// Commission
export const useCommissionNotifications = (userId: string) =>
  useQuery({
    queryKey: ["commissionNotifications", userId],
    queryFn: () => getCommissionNotifications(userId),
    enabled: !!userId,
  });

// Admin
export const useAdminNotifications = (id: string) =>
  useQuery({
    queryKey: ["adminNotifications", id],
    queryFn: () => getAdminNotifications(id),
    enabled: !!id,
  });

// Mark as seen
export const useMarkNotificationSeen = () =>
  useMutation({
    mutationFn: ({
      userId,
      notificationId,
    }: {
      userId: string;
      notificationId: string;
    }) => markNotificationAsSeen(userId, notificationId),
  });
