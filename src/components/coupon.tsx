import { Label } from "./typography";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { applyCoupon } from "@/lib/store/slices/cartSlice";
import { useCheckCoupon } from "@/hooks/useCoupon";
import { toast } from "sonner";

const Coupon = () => {
  const dispatch = useAppDispatch();
  const { coupoun_code } = useAppSelector((state) => state.cart);
  const { userId } = useAppSelector((state) => state.auth);
  const [couponCode, setCouponCode] = useState("");

  const { mutate: checkCoupon, isPending } = useCheckCoupon(userId || 0);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    checkCoupon(
      { coupoun_code: couponCode },
      {
        onSuccess: ({ data }) => {
          if (data?.is_valid) {
            dispatch(applyCoupon({ code: couponCode, amount: data.amount }));
            toast.success(`Coupon applied! You saved Rs. ${data.amount}`);
          } else {
            toast.error("Invalid or expired coupon code.");
          }
        },
        onError: () => {
          toast.error("Failed to apply coupon. Please try again later.");
        },
      }
    );
  };

  return (
    <>
      <Label>Coupon Code</Label>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          disabled={isPending}
        />
        <Button onClick={handleApplyCoupon} disabled={isPending}>
          {isPending ? "Checking..." : "Apply"}
        </Button>
      </div>
    </>
  );
};

export default Coupon;
