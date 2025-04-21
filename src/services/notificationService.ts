// services/notificationService.ts
import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";

// Cashback notifications
export const getCashbackNotifications = (userId: string) =>
  asyncHandler(() =>
    api.get(`/getCashBackNotification/${userId}`).then((res) => res.data)
  );

// Commission notifications
export const getCommissionNotifications = (userId: string) =>
  asyncHandler(() =>
    api.get(`/getCommissionNotification/${userId}`).then((res) => res.data)
  );

// Admin notifications
export const getAdminNotifications = (id: string) =>
  asyncHandler(() =>
    api.get(`/getAdminNotification/${id}`).then((res) => res.data)
  );

// Mark as seen
export const markNotificationAsSeen = (
  userId: string,
  notificationId: string
) =>
  asyncHandler(() =>
    api
      .get(`/seeNotification/${userId}?notification_id=${notificationId}`)
      .then((res) => res.data)
  );
