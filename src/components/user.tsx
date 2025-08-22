"use client";

import { FaUserCircle } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/store/hooks";
import getImageUrl from "@/utils/getImageUrl";
const User = () => {
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
    <div>
      {/* <FaUserCircle className="tex cursor-pointer size-6" /> */}
      <Avatar className="h-14 w-14">
        <AvatarImage src={getImageUrl(user?.image)} />
        <AvatarFallback>{getInitials()}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default User;
