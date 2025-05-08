"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { logout } from "@/lib/store/slices/authSlice";
import getImageUrl from "@/utils/getImageUrl";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  User,
  ShoppingCart,
  Banknote,
  Ticket,
  Heart,
  Bell,
  LogOut,
  CreditCard,
} from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Bank Accounts",
    href: "/bank-accounts",
    icon: Banknote,
  },
  {
    label: "Coupons",
    href: "/coupons",
    icon: Ticket,
  },
  {
    label: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
];

const UserBtn = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [openSheet, setOpenSheet] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const getInitials = () => {
    if (user?.fname || user?.lname) {
      return `${user.fname?.[0] || ""}${user.lname?.[0] || ""}`.toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const handleLogout = () => {
    dispatch(logout());
    setOpenDialog(false);
    setOpenSheet(false);
    router.push("/auth/login");
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={getImageUrl(user?.image)} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 flex flex-col justify-between">
        <div>
          <SheetHeader>
            <SheetTitle className="text-center">Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-4">
            {menuItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpenSheet(false)}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Logout Button with Confirmation */}
        <div className="mb-4">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 gap-3"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to logout?</DialogTitle>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserBtn;
