import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NotificationBase,
  AdminNotification,
  CashbackNotification,
  CommissionNotification,
} from "@/types";

interface NotificationsState {
  cashback: CashbackNotification[];
  commission: CommissionNotification[];
  admin: AdminNotification[];
}

const initialState: NotificationsState = {
  cashback: [],
  commission: [],
  admin: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setCashbackNotifications: (
      state,
      action: PayloadAction<CashbackNotification[]>
    ) => {
      state.cashback = action.payload;
    },
    setCommissionNotifications: (
      state,
      action: PayloadAction<CommissionNotification[]>
    ) => {
      state.commission = action.payload;
    },
    setAdminNotifications: (
      state,
      action: PayloadAction<AdminNotification[]>
    ) => {
      state.admin = action.payload;
    },
    markAsSeen: (
      state,
      action: PayloadAction<{
        type: "cashback" | "commission" | "admin";
        id: number;
      }>
    ) => {
      const { type, id } = action.payload;
      const list = state[type];
      const index = list.findIndex((item: NotificationBase) => item.id === id);
      if (index !== -1) {
        list[index].seen = "1";
      }
    },
  },
});

export const {
  setCashbackNotifications,
  setCommissionNotifications,
  setAdminNotifications,
  markAsSeen,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
