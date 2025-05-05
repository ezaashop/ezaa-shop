import { UserCart } from "@/types";
import React from "react";
import MyImage from "../my-image";
import Link from "next/link";

const OrderedItem = ({ item }: { item: UserCart }) => {
  return (
    <Link href={`/product/${item.product_id}`} className="border p-4 rounded-md shadow-sm flex items-start gap-4">
      {/* Fixed small image at top-left */}
      <div className="w-16 h-16 flex-shrink-0">
        <MyImage
          src={item.image}
          alt={item.product_name}
          width={64}
          height={64}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Right side content */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.product_name}</h3>
        <p className="text-sm">Price: Rs. {item.price}</p>
        <p className="text-sm">Quantity: {item.quantity}</p>
        {/* <p className="text-sm">Category: {item.category_name}</p> */}
        <p className="text-sm">
          Shipping Address: {item.orders.shipping_address}
        </p>

        {/* Order status */}
        <p className="text-sm mt-2 capitalize text-signature text-end">
          {item.orders.status}
        </p>
      </div>
    </Link>
  );
};

export default OrderedItem;
