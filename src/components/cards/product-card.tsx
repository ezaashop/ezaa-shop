"use client";
import { ShoppingCart } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addProduct } from "@/lib/store/slices/cartSlice";
import { Product } from "@/types";
import { toast } from "sonner";
import Favorite from "../favorite";
import MyImage from "../my-image";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product }: { product: Product }) => {
  const { id, product_image, name, product_deatils } = product;
  const { selling_price } = product_deatils[0] || {};
  const dispatch = useAppDispatch();
  const { token, userId } = useAppSelector((store) => store.auth);
  const { pendingReferralCode } = useAppSelector((store) => store.referral);
  const router = useRouter();

  // Use -1 as default userId for product detail fetching if user is not registered
  const effectiveUserId = userId || -1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!token || !userId) {
      let loginUrl = "/auth/login";
      if (pendingReferralCode) loginUrl += `?referralCode=${pendingReferralCode}`;
      router.push(loginUrl);
      return;
    }

    if (!id || !selling_price) return;

    dispatch(
      addProduct({
        product_id: product.id,
        product_name: product.name,
        category_name: product.category?.name,
        image: product.product_image[0].image,
        quantity: 1,
         selling_price: parseFloat(product.product_deatils[0].selling_price),
         price: parseFloat(product.product_deatils[0].price),
        sub_total: parseFloat(product.product_deatils[0].selling_price),
      })
    );

    toast.success("Added to cart!");
  };

  const handleProductClick = (e: React.MouseEvent) => {
    if (!token || !userId) {
      e.preventDefault();
      let loginUrl = "/auth/login";
      if (pendingReferralCode) loginUrl += `?referralCode=${pendingReferralCode}`;
      router.push(loginUrl);
      return;
    }
  };

  return (
    <div className="w-full bg-secondary p-3 rounded-2xl shadow hover:shadow-md transition-all relative pointer-events-none hover:bg-signature/10 hover:border-1 hover:border-solid">
      <Favorite
        product={product}
        className="absolute top-5 right-5 z-20 pointer-events-auto "
      />
      <Link href={`/products/${id}`} className="block pointer-events-auto" onClick={handleProductClick}>
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white ">
          {product_image.length > 0 ? (
            <Carousel opts={{ loop: true }} autoplay={true}>
              <CarouselContent>
                {product_image.map(({ image }, idx) => (
                  <CarouselItem key={idx}>
                    <MyImage
                      src={image}
                      alt={name || "Product image"}
                      width={150}
                      height={150}
                      className="object-contain z h-36 mx-auto"
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
        </div>

        {name && (
          <h3 className="text-center text-sm font-semibold mt-3 truncate">
            {name}
          </h3>
        )}
        {selling_price && 
        (
          <div className="flex justify-center items-center gap-2 mt-1 text-xs">
            {selling_price && (
              <span className="text-red-600 font-bold">PKR {selling_price}</span>
            )}
          </div>
        )}
      </Link>
      <div className="pointer-events-auto">
      <Button
  onClick={handleAddToCart}
  variant="link"
  className="flex items-center gap-1 mx-auto text-xs font-semibold mt-0 text-primary"
>
  <ShoppingCart size={16} />
  ADD TO CART
</Button>

      </div>
    </div>
  );
};