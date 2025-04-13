"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const dummyCartItems = [
  {
    id: "1",
    name: "Extra Bass Speaker With High Quality",
    price: 276.33,
    quantity: 1,
    image: "/images/product.png",
  },
  {
    id: "2",
    name: "18 Inch Laptop With NVME SSD",
    price: 576.33,
    quantity: 1,
    image: "/images/product.png",
  },
  {
    id: "3",
    name: "Joystick Dual Pro X88",
    price: 46.33,
    quantity: 1,
    image: "/images/product.png",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(dummyCartItems);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getTotal = () => {
    return cart
      .filter((item) => selected.includes(item.id))
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT - Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between border p-4 rounded-xl mb-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selected.length === cart.length}
                onCheckedChange={() => {
                  if (selected.length === cart.length) setSelected([]);
                  else setSelected(cart.map((item) => item.id));
                }}
              />
              <span>Select All</span>
            </div>
            <div className="space-x-4">
              <Button variant="outline">Update Cart</Button>
              <Button variant="destructive">Remove</Button>
            </div>
          </div>

          {/* Cart Items List */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded-2xl mb-4 bg-white shadow-sm w-full gap-4"
            >
              {/* Left section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selected.includes(item.id)}
                    onCheckedChange={() => toggleSelect(item.id)}
                  />
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md flex-shrink-0"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-800 line-clamp-2">
                    {item.name}
                  </h4>
                  <span className="text-sm text-gray-500">+Add note</span>
                </div>
              </div>

              {/* Right section */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 md:justify-end">
                <span className="text-lg font-bold text-red-600 whitespace-nowrap">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex items-center border rounded-md px-2 py-1 gap-2">
                  <button className="text-xl text-gray-500">−</button>
                  <span>{item.quantity}</span>
                  <button className="text-xl text-gray-500">+</button>
                </div>
                <Button size="icon" variant="ghost" className="text-red-500">
                  🗑
                </Button>
                <Button size="icon" variant="ghost">
                  ❤️
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - Summary */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="border p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="text-red-600 font-semibold text-lg">
                ${getTotal()}
              </span>
            </div>
            <Button className="w-full mb-2 " variant={"signature"}>
              Checkout
            </Button>
            <Button variant="outline" className="w-full text-signature">
              Continue Shopping
            </Button>
          </div>

          <div className="border p-4 rounded-xl shadow-sm flex items-center justify-between">
            <span>Have a coupon code?</span>
            <Button variant="outline">Enter</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
