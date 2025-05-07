"use client";

import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { markAsSeen } from "@/lib/store/slices/notificationSlice";
import {
  CashbackNotification,
  CommissionNotification,
  AdminNotification,
} from "@/types";

type NotificationType = "cashback" | "commission" | "admin";

const Notifications = () => {
  const dispatch = useAppDispatch();

  const cashback = useAppSelector((state) => state.notifications.cashback);
  const commission = useAppSelector((state) => state.notifications.commission);
  // const admin = useAppSelector((state) => state.notifications.admin);

  const renderList = (
    title: string,
    list: (CashbackNotification | CommissionNotification | AdminNotification)[],
    type: NotificationType
  ) => (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">No notifications</p>
      ) : (
        <ul className="space-y-2">
          {list.map((item: any) => (
            <li
              key={item.id}
              className={`p-3 rounded border cursor-pointer ${
                item.seen === "0"
                  ? "bg-yellow-50 border-yellow-300"
                  : "bg-white border-gray-200"
              }`}
              onClick={() => {
                if (item.seen === "0") {
                  dispatch(markAsSeen({ type, id: item.id }));
                }
              }}
            >
              <p className="text-sm">
                {item.message || item.title || item.content}
              </p>
              {item.seen === "0" && (
                <span className="text-xs text-yellow-600">Unseen</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="">
      {renderList("Cashback Notifications", cashback, "cashback")}
      {renderList("Commission Notifications", commission, "commission")}
      {/* {renderList("Admin Notifications", admin, "admin")} */}
    </div>
  );
};

export default Notifications;
