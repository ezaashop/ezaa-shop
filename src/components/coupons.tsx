"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateCoupon } from "@/hooks/useCoupon";
import { Skeleton } from "@/components/ui/skeleton";
import { useCouponCodes } from "@/hooks/useCoupon";
import { useAppSelector } from "@/lib/store/hooks";

const Coupons = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const { data, isLoading, refetch } = useCouponCodes(userId || 0);

  const couponCodes = data?.data?.userCouponCode || [];

  return (
    <div className="max-w-xl mx-auto mt-6">
      <CouponDialog refetch={refetch} />

      {isLoading ? (
        [...Array(3)].map((_, idx) => (
          <div key={idx} className="border p-4 mb-3 rounded-md shadow-sm">
            <Skeleton className="w-1/3 h-4 mb-2" />
            <Skeleton className="w-1/4 h-3 mb-1" />
            <Skeleton className="w-1/4 h-3" />
          </div>
        ))
      ) : couponCodes.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          No coupon codes found.
        </p>
      ) : (
        couponCodes.map((item: any) => (
          <div key={item.id} className="border p-4 mb-3 rounded-md shadow-md">
            <p className="font-semibold">Code: {item.coupan_code}</p>
            <p>Amount: Rs. {item.amount}</p>
            <p>Status: {item.status === "1" ? "Used" : "Unused"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Coupons;

const CouponDialog = ({ refetch }: { refetch: () => void }) => {
  const { userId } = useAppSelector((state) => state.auth);
  const [amount, setAmount] = useState("");
  const { mutate, isPending } = useCreateCoupon(userId || 0);

  const handleCreate = () => {
    mutate(
      { amount: parseFloat(amount) },
      {
        onSuccess: () => {
          setAmount("");
          refetch();
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4">Create Coupon</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-semibold mb-2">Generate Coupon</h2>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={handleCreate} disabled={isPending} className="mt-2">
          {isPending ? "Creating..." : "Generate"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
