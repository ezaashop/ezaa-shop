"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
}

export const ProductCard = ({
  image,
  title,
  originalPrice,
  discountedPrice,
}: ProductCardProps) => {
  return (
    <div className="rounded-2xl shadow-sm bg-white p-4 relative max-w-[220px] w-full cursor-pointer">
      <div className="relative w-full h-[160px] flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={150}
          height={150}
          className="object-contain"
        />
        <Heart className="absolute top-2 right-2 text-red-500 fill-red-500 w-5 h-5" />
      </div>

      <h3 className="text-center text-sm font-semibold mt-4">{title}</h3>

      <div className="flex items-center justify-center gap-2 text-sm mt-1">
        <span className="text-muted-foreground line-through">
          ${originalPrice.toFixed(2)}
        </span>
        <span className="text-red-600 font-bold">
          ${discountedPrice.toFixed(2)}
        </span>
      </div>

      <Button
        variant="link"
        className="block mx-auto text-xs font-semibold mt-2"
      >
        ADD TO CART
      </Button>
    </div>
  );
};
