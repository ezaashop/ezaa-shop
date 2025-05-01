"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Small } from "./typography";
import Link from "next/link";
import getImageUrl from "@/utils/getImageUrl";
const KeyValue = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Small className="flex w-full gap-4">
    <span className="font-medium">{label}:</span> <span>{value}</span>
  </Small>
);
const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);

  const getFullName = () => {
    if (user?.fname && user?.lname) return `${user.fname} ${user.lname}`;
    if (user?.fname) return user.fname;
    if (user?.lname) return user.lname;
    return null;
  };

  const profileIncomplete = !user?.fname || !user?.lname || !user?.image;

  return (
    <div className="max-w-xl mx-auto md:px-4">
      <Card className="bg-background text-foreground">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={getImageUrl(user?.image) || undefined}
              alt="Profile Image"
            />
            <AvatarFallback>
              {getFullName()?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">
              {getFullName() || "Unnamed User"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {user?.email || "No email available"}
            </p>
            <p className="text-muted-foreground text-sm">
              {user?.phone || "No phone number provided"}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <KeyValue label="Type" value={user?.user_type || "N/A"} />
            <KeyValue label="Last Login" value={user?.last_login || "N/A"} />
            <KeyValue label="Last Logout" value={user?.last_logout || "N/A"} />

            <KeyValue
              label="Account Status"
              value={user?.status === 1 ? "Active" : "Inactive"}
            />
            {profileIncomplete && (
              <div className="mt-4">
                <Badge variant="destructive">Profile incomplete</Badge>
                <p className="text-muted-foreground text-xs mt-1">
                  Add your full name and a profile image to complete your
                  profile.
                </p>
              </div>
            )}
            <Link href="/profile/edit">
              <Button className="mt-6 w-full">Edit Profile</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
