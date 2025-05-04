"use client";

import { Button } from "@/components/ui/button";
import { removeProduct, updateQuantity } from "@/lib/store/slices/cartSlice";
import { CartItem as CartItemType } from "@/types";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import MyImage from "../my-image";
import { Paragraph } from "../typography";

const CartItem = ({ product }: { product: CartItemType }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (type: "inc" | "dec") => {
    const newQty = type === "inc" ? product.quantity + 1 : product.quantity - 1;
    if (newQty > 0) {
      dispatch(
        updateQuantity({ product_id: product.product_id, quantity: newQty })
      );
    }
  };

  return (
    <div className="flex items-start justify-between border-b-2 py-4 gap-4">
      {/* Product Image */}
      <MyImage
        src={product.image}
        alt={product.product_name}
        width={80}
        height={80}
        className="h-20 w-20 sm:h-24 sm:w-24"
      />

      {/* Product Info */}
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{product.product_name}</h2>
        <div className="flex items-center gap-2 border w-fit rounded-lg">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleQuantityChange("dec")}
          >
            <Minus size={16} />
          </Button>
          <span>{product.quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleQuantityChange("inc")}
          >
            <Plus size={16} />
          </Button>
        </div>
        {/* <XSmall>Price: Rs. {product.price}</XSmall> */}

        <Paragraph className="font-medium mt-2">
          Subtotal: Rs. {product.sub_total}
        </Paragraph>
      </div>

      {/* Remove Product */}

      <Button
        size="icon"
        variant="destructive"
        onClick={() => dispatch(removeProduct(product.product_id))}
      >
        <Trash size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
