"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import CartItem from "./cards/cart-item";
import { Label, Paragraph, Small } from "./typography";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const Cart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <CartItems />
      <CartSummary />
    </div>
  );
};

export default Cart;

const CartItems = () => {
  const cart = useAppSelector((state) => state.cart);
  return (
    <div className="md:col-span-2 flex flex-col gap-2">
      {cart.products.length > 0 ? (
        <>
          {cart.products.map((product) => (
            <CartItem key={product.product_id} product={product} />
          ))}
        </>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Small className="flex items-center justify-between gap-2">
    <span>{label}</span> <span>{value}</span>
  </Small>
);

const CartSummary = () => {
  const { products, coupoun_code, coupoun_amount, total_amount } = useAppSelector(
    (state) => state.cart
  );

  return (
    <Card className="h-fit">
      <CardContent className="flex flex-col gap-2">
        <Label>Coupon Code</Label>
        <div className="flex items-center gap-2">
          <Input placeholder="Enter coupon code" />
          <Button>Apply</Button>
        </div>

        <Separator className="my-2 border-dashed border-2" />

        <SummaryRow label="Total Items" value={products.length} />
        <SummaryRow label="Coupon Code" value={coupoun_code || "None"} />
        <SummaryRow label="Coupon Discount" value={`Rs. ${coupoun_amount}`} />

        <Separator className="my-2" />

        <Paragraph className="flex items-center justify-between gap-2 font-semibold">
          <span>Total Amount</span> <span>Rs. {total_amount}</span>
        </Paragraph>

        <Link href="/checkout" className="w-full">
          <Button variant="signature" className="w-full">
            Checkout
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
