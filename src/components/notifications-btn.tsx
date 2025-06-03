"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/lib/store/hooks";
import { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import Notifications from "./pages/notifications";

const NotificationsSheet = () => {
  const [open, setOpen] = useState(false);

  const { cashback, commission, admin } = useAppSelector(
    (state) => state.notifications
  );

  const unseenCount =
    cashback.filter((n) => n.seen === "0").length +
    commission.filter((n) => n.seen === "0").length +
    admin.filter((n) => n.seen === "0").length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unseenCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs z-10">
              {unseenCount}
            </span>
          )}
          <IoMdNotifications className="size-6 text-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[22rem] sm:w-[24rem] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-center">Notifications</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-full">
          <Notifications />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsSheet;
