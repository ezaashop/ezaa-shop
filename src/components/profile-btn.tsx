"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { logout } from "@/lib/store/slices/authSlice";
import getImageUrl from "@/utils/getImageUrl";
import Link from "next/link";
import { useState } from "react";

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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Banknote,
  Bell,
  CreditCard,
  Heart,
  LogOut,
  ShoppingCart,
  Ticket,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { RiUserSharedLine, RiShoppingBag3Line, RiHeart3Line, RiTeamLine, RiCustomerService2Line } from "react-icons/ri";
import { DialogDescription } from "@/components/ui/dialog";

const menuItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: RiUserSharedLine,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: RiShoppingBag3Line,
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
    label: "Wallet",
    href: "/wallet",
    icon: CreditCard,
  },
  {
    label: "Referrals",
    href: "/referrals",
    icon: RiUserSharedLine,
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
  {
    label: "About Us",
    href: "/about",
    icon: RiTeamLine,
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    icon: RiCustomerService2Line,
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

      <SheetContent side="right" className="w-72 flex flex-col bg-gradient-to-b from-background to-muted/50">
        {/* Header */}
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="text-xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Menu
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-4">
            {/* Main Menu Items */}
            <div className="flex flex-col gap-2">
              {menuItems.slice(0, 3).map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpenSheet(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-200 group"
                >
                  <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-medium group-hover:text-primary transition-colors">{label}</span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 px-3">
              <div className="h-px bg-border/50" />
            </div>

            {/* About and Contact Section */}
            <div className="flex flex-col gap-2">
              <div className="px-3 mb-2">
                <span className="text-sm font-medium text-muted-foreground">Information</span>
              </div>
              {menuItems.slice(3).map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpenSheet(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-200 group"
                >
                  <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-medium group-hover:text-primary transition-colors">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Logout Button */}
        <div className="border-t border-border pt-4 pb-2">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 gap-3 p-3 rounded-lg transition-all duration-200 group"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Logout</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-center">Confirm Logout</DialogTitle>
                <DialogDescription className="text-center text-muted-foreground">
                  Are you sure you want to logout from your account?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                  className="hover:bg-muted"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700"
                >
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
