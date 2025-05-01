"use client";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { IoCart } from "react-icons/io5";
const CartButton = () => {
  const { products } = useAppSelector((store) => store.cart);
  const items = products?.length;
  return (
    <Link href="/cart" className="relative">
      {items > 0 && (
        <span className="absolute top-0 right-0 bg-signature text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">
          {items}
        </span>
      )}
      <IoCart className="cursor-pointer size-7" />
    </Link>
  );
};

export default CartButton;
