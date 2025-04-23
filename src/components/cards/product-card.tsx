"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Heart } from "lucide-react";
import MyImage from "../my-image";

interface ProductCardProps {
  image: { image: string; cover_status: number }[];
  title?: string;
  product_deatils?: { price?: string; selling_price?: string }[];
}

export const ProductCard = ({
  image = [],
  title = "",
  product_deatils = [],
}: ProductCardProps) => {
  const { price, selling_price } = product_deatils[0] || {};

  return (
    <div className="w-full  bg-secondary p-3 rounded-2xl shadow hover:shadow-md transition-all relative">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white">
        {image.length > 0 ? (
          <Carousel opts={{ loop: true }} autoplay>
            <CarouselContent>
              {image.map(({ image }, idx) => (
                <CarouselItem key={idx}>
                  <MyImage
                    src={image}
                    alt={title || "Product image"}
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
        <Heart className="absolute top-2 right-2 text-red-500 fill-red-500 w-5 h-5" />
      </div>

      {title && (
        <h3 className="text-center text-sm font-semibold mt-3 truncate">
          {title}
        </h3>
      )}

      {(price || selling_price) && (
        <div className="flex justify-center items-center gap-2 mt-1 text-sm">
          {price && (
            <span className="text-muted-foreground line-through">
              PKR {price}
            </span>
          )}
          {selling_price && (
            <span className="text-red-600 font-bold">PKR {selling_price}</span>
          )}
        </div>
      )}

      <Button
        variant="link"
        className="block mx-auto text-xs font-semibold mt-1 text-primary"
      >
        ADD TO CART
      </Button>
    </div>
  );
};
