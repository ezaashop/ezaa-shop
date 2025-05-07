"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
  useCashbackNotifications,
  useCommissionNotifications,
  useAdminNotifications,
} from "@/hooks/useNotifications";
import {
  setCashbackNotifications,
  setCommissionNotifications,
  setAdminNotifications,
} from "@/lib/store/slices/notificationSlice";

const NotificationsBtn = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((store) => store.auth.user?.id) || "";

  const { data: cashbackData } = useCashbackNotifications(userId);
  const { data: commissionData } = useCommissionNotifications(userId);
  const { data: adminData } = useAdminNotifications(userId);

  // 🔄 Update Redux state on fetch
  useEffect(() => {
    if (cashbackData?.data?.userCashBack) {
      dispatch(setCashbackNotifications(cashbackData.data.userCashBack));
    }
  }, [cashbackData, dispatch]);

  useEffect(() => {
    if (commissionData?.data?.userCommission) {
      dispatch(setCommissionNotifications(commissionData.data.userCommission));
    }
  }, [commissionData, dispatch]);

  useEffect(() => {
    if (adminData?.data?.adminNotification) {
      dispatch(setAdminNotifications(adminData.data.adminNotification));
    }
  }, [adminData, dispatch]);

  // 🧠 Use from Redux state
  const { cashback, commission, admin } = useAppSelector(
    (state) => state.notifications
  );

  const unseenCount =
    cashback.filter((n) => n.seen === "0").length +
    commission.filter((n) => n.seen === "0").length +
    admin.filter((n) => n.seen === "0").length;

  return (
    <Link href="/notifications" className="relative">
      {unseenCount > 0 && (
        <span className="absolute top-0 right-0 bg-signature text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">
          {unseenCount}
        </span>
      )}
      <IoMdNotifications className="cursor-pointer size-7" />
    </Link>
  );
};

export default NotificationsBtn;
