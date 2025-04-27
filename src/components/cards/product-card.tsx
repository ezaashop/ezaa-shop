"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppDispatch } from "@/lib/store/hooks";
import { addProduct } from "@/lib/store/slices/cartSlice"; // ✅ cart slice
import { Product } from "@/types";
import Link from "next/link";
import { toast } from "sonner";
import Favorite from "../favorite";
import MyImage from "../my-image";

export const ProductCard = ({ product }: {product:Product}) => {
  const { id, product_image, name, product_deatils } = product;
  const { price, selling_price } = product_deatils[0] || {};

  const dispatch = useAppDispatch();

  // ADD TO CART HANDLER 👇
  const handleAddToCart = () => {
    if (!id || !price) return; // Prevent accidental wrong data

    dispatch(
      addProduct({
        product_id: Number(id),
        price: Number(price),
        quantity: 1,
      })
    );
    toast.success("Added to cart!");
  };

  return (
    <div className="w-full bg-secondary p-3 rounded-2xl shadow hover:shadow-md transition-all relative">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white">
        {product_image.length > 0 ? (
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {product_image.map(({ image }, idx) => (
                <CarouselItem key={idx}>
                  <MyImage
                    src={image}
                    alt={name || "Product image"}
                    width={150}
                    height={150}
                    className="object-contain w-full h-36 mx-auto"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex items-center justify-center h-36 text-sm text-muted-foreground">
            No image
          </div>
        )}

        <Favorite
          product={product}
          className="absolute top-2 right-2 "
        />
      </div>

      <Link href={`/products/${id}`}>
        {name && (
          <h3 className="text-center text-sm font-semibold mt-3 truncate">
            {name}
          </h3>
        )}
        {selling_price && (
          <div className="flex justify-center items-center gap-2 mt-1 text-sm">
            {price && (
              <span className="text-muted-foreground line-through">
                PKR {selling_price}
              </span>
            )}
            {price && (
              <span className="text-red-600 font-bold">PKR {price}</span>
            )}
          </div>
        )}
      </Link>

      {/* ADD TO CART BUTTON */}
      <Button
        onClick={handleAddToCart}
        variant="link"
        className="block mx-auto text-xs font-semibold mt-1 text-primary"
      >
        ADD TO CART
      </Button>
    </div>
  );
};
