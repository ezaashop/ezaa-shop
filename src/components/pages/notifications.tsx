"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { markAsSeen } from "@/lib/store/slices/notificationSlice";
import { cn } from "@/lib/utils";
import {
  AdminNotification,
  CashbackNotification,
  CommissionNotification,
} from "@/types";
import { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { H5, Small, XSmall } from "../typography";

const ITEMS_PER_BATCH = 6;
const LOAD_DELAY = 800;

type NotificationWithType = (
  | CashbackNotification
  | CommissionNotification
  | AdminNotification
) & {
  _type: "cashback" | "commission" | "admin";
};

const Notifications = () => {
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.notifications.admin);

  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_BATCH);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          await new Promise((r) => setTimeout(r, LOAD_DELAY));
          setVisibleItems((prev) => prev + ITEMS_PER_BATCH);
          setIsLoadingMore(false);
        }
      },
      { threshold: 1 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    // ✅ Cleanup must return a function, not `null`
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [isLoadingMore]);

  const renderSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-20 bg-muted animate-pulse rounded-lg border"
        />
      ))}
    </div>
  );
  return (
    <div className="px-4 py-8 mx-auto">
      <h2 className="text-lg md:text-xl font-bold mb-4">All Notifications</h2>

      {!admin.length ? (
        renderSkeleton()
      ) : (
        <div className="space-y-4">
          {admin
            .slice(0, visibleItems)
            .map(
              ({
                id,
                title,
                descriptions,
                seen,
                created_at,
              }: AdminNotification) => (
                <Card
                  key={id}
                  onClick={() => {
                    if (seen === "0") {
                      dispatch(markAsSeen({ type: "admin", id }));
                    }
                  }}
                  className={cn(
                    "transition-all cursor-pointer hover:shadow-md border p-2",
                    seen === "0"
                      ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600"
                      : "bg-background"
                  )}
                >
                  <CardContent className="flex items-start gap-2 p-2">
                    <FaRegBell className="text-yellow-500 mt-1" />
                    <div className="flex-1">
                      <H5 className="text-signature">{title}</H5>
                      <Small>{descriptions}</Small>
                      <XSmall className="text-muted-foreground mt-1">
                        {new Date(created_at).toLocaleString()}
                      </XSmall>
                      {seen === "0" && (
                        <XSmall className="text-yellow-700 dark:text-yellow-300">
                          Unseen
                        </XSmall>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            )}
        </div>
      )}

      {visibleItems < admin.length && (
        <div ref={observerRef} className="flex justify-center mt-6">
          <div className="h-6 w-6 border-t-2 border-l border-r-4 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Notifications;
