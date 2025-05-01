"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/store/hooks";
import getImageUrl from "@/utils/getImageUrl";
import Link from "next/link";
import { Button } from "./ui/button";
const UserBtn = () => {
  const { user } = useAppSelector((state) => state.auth);
  const getInitials = () => {
    if (user?.fname || user?.lname) {
      return `${user.fname?.[0] || ""}${user.lname?.[0] || ""}`.toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };
  return (
    <Link href="/profile">
      {/* <FaUserCircle className="tex cursor-pointer size-6" /> */}
      <Button variant="outline" size="icon" className="rounded-full">
        <Avatar className="size-8">
          <AvatarImage src={getImageUrl(user?.image)} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </Button>
    </Link>
  );
};

export default UserBtn;
