"use client";

import { useUserCartInfo } from "@/hooks/useProducts";
import { useAppSelector } from "@/lib/store/hooks";

import { UserCart } from "@/types";
import OrderedItem from "../cards/ordered-item";

const Orders = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useUserCartInfo(userId || 0);

  const cartData = data?.data?.user_carts || [];

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <OrderCardSkeleton key={index} />
        ))}
      </>
    );
  }

  return (
    <div>
      {cartData?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartData.map((item: UserCart) => (
            <OrderedItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p>No orders</p>
      )}
    </div>
  );
};

export default Orders;

import { Skeleton } from "@/components/ui/skeleton";

const OrderCardSkeleton = () => {
  return (
    <div className="border p-4 rounded-md shadow-sm flex items-start gap-4">
      {/* Image skeleton */}
      <div className="w-16 h-16 flex-shrink-0">
        <Skeleton className="w-full h-full rounded-md" />
      </div>

      {/* Content skeleton */}
      <div className="flex-1 space-y-2">
        <Skeleton className="w-3/5 h-4" /> {/* Product name */}
        <Skeleton className="w-2/5 h-3" /> {/* Price */}
        <Skeleton className="w-1/4 h-3" /> {/* Quantity */}
        <Skeleton className="w-4/5 h-3" /> {/* Shipping address */}
        <div className="flex justify-end">
          <Skeleton className="w-1/4 h-3" /> {/* Order status */}
        </div>
      </div>
    </div>
  );
};
