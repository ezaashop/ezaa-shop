"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import MyImage from "../my-image";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import Link from "next/link";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { useState } from "react";
import { addProduct } from "@/lib/store/slices/cartSlice"; // ✅ cart slice
import { addFavorite, removeFavorite } from "@/lib/store/slices/favoriteSlice";

interface ProductCardProps {
  id: string;
  image: { image: string; cover_status: number }[];
  title?: string;
  product_deatils?: { price?: string; selling_price?: string }[];
}

export const ProductCard = ({
  id,
  image = [],
  title = "",
  product_deatils = [],
}: ProductCardProps) => {
  const { price, selling_price } = product_deatils[0] || {};

  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((store) => store.auth);
  const { favorites } = useAppSelector((store) => store.favorite) || {};

  const { mutate: addFavoriteMutate } = useAddFavorite(userId || "");
  const { mutate: removeFavoriteMutate } = useRemoveFavorite(userId || "");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFavorite = favorites.some((favorite) => favorite.products.id === id);

  const toggleFavorite = () => {
    if (!userId || isSubmitting) return; // prevent unauthorized or double-click

    setIsSubmitting(true);

    const favoriteProductData = {
      products: {
        id,
        product_image: image,
        name: title,
        product_deatils,
      },
    };

    if (isFavorite) {
      dispatch(removeFavorite(id));
      removeFavoriteMutate(
        { product_id: id },
        {
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    } else {
      dispatch(addFavorite(favoriteProductData)); // <-- Pass full data here
      addFavoriteMutate(
        { product_id: id },
        {
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    }
  };

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
  };

  return (
    <div className="w-full bg-secondary p-3 rounded-2xl shadow hover:shadow-md transition-all relative">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white">
        {image.length > 0 ? (
          <Carousel opts={{ loop: true }}>
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

        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-signature w-6 h-6 flex items-center justify-center cursor-pointer"
          disabled={isSubmitting}
        >
          {isFavorite ? (
            <BsHeartFill className="w-full h-full animate-ping-slow" />
          ) : (
            <BsHeart className="w-full h-full" />
          )}
        </button>
      </div>

      <Link href={`/products/${id}`}>
        {title && (
          <h3 className="text-center text-sm font-semibold mt-3 truncate">
            {title}
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
