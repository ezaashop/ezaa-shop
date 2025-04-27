"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProductDetailByIdAndUser } from "@/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addProduct } from "@/lib/store/slices/cartSlice";
import getImageUrl from "@/utils/getImageUrl";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "sonner";
import Container from "./container";
import Favorite from "./favorite";
import MyImage from "./my-image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import RichText from "./rich-text";
import Loader from "./loader";

const ProductDetails = ({ id }: { id: string }) => {
  const { userId } = useAppSelector((store) => store.auth);
  const { data, isLoading, isError, error } = useProductDetailByIdAndUser(
    id,
    userId as string
  );
  const [quantity, setQuantity] = useState(1);
  const product = data?.data?.productDetails;

  // Always call hooks before returning or conditionals
  const dispatch = useAppDispatch();

  if (isLoading)
    return (
      <div className="w-full mx-auto flex items-center justify-center h-[50vh]">
        <Loader />
      </div>
    );
  if (isError || error) {
    return (
      <div className="text-center py-20">
        {error?.message || "Something went wrong"}
      </div>
    );
  }

  const discount = Math.round(
    ((parseFloat(product.product_deatils[0]?.selling_price) -
      parseFloat(product.product_deatils[0]?.price)) /
      parseFloat(product.product_deatils[0]?.selling_price)) *
      100
  );

  const handleAddToCart = () => {
    if (!product?.id || !product.product_deatils[0]?.price) return; // Prevent accidental wrong data

    dispatch(
      addProduct({
        product_id: Number(product.id),
        price: Number(product.product_deatils[0]?.price),
        quantity, // Use selected quantity
      })
    );
    toast.success("Added to cart!");
    setQuantity(1);
  };

  return (
    <PhotoProvider>
      <Container className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div>
            <Card className="p-4">
              {product.product_image.length > 0 ? (
                <Carousel opts={{ loop: true }} autoplay delay={3000}>
                  <CarouselContent>
                    {product.product_image.map((image: any, idx: number) => (
                      <CarouselItem key={idx}>
                        <PhotoView src={getImageUrl(image.image)}>
                          <MyImage
                            src={image.image}
                            alt={product.name || "Product image"}
                            width={600}
                            height={600}
                            className="rounded-xl object-cover object-center h-48 md:h-full aspect-square"
                          />
                        </PhotoView>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              ) : (
                <div className="flex items-center justify-center h-36 text-sm text-muted-foreground">
                  No image
                </div>
              )}
            </Card>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              autoplay
              delay={3000}
              className="w-full max-w-md mt-4"
            >
              <CarouselContent>
                {product.product_image.map((img: any) => (
                  <CarouselItem key={img.id} className="basis-auto">
                    <PhotoView src={getImageUrl(img.image)}>
                      <MyImage
                        src={`/${img.image}`}
                        alt="Thumbnail"
                        width={80}
                        height={80}
                        className="object-cover object-center aspect-square rounded-md border p-1 cursor-pointer"
                      />
                    </PhotoView>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Right - Details */}
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-sm">
                {product.category?.name} / {product.subcategory?.name}
              </Badge>
              <Favorite product={product} />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mt-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl font-semibold text-green-600">
                PKR {product.product_deatils[0]?.selling_price}
              </span>
              <span className="text-gray-400 line-through">
                PKR {product.product_deatils[0]?.price}
              </span>
              <Badge variant="destructive">Save {discount}%</Badge>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-green-600 text-sm">Free Delivery</span>
              <span className="text-green-600 text-sm">In Stock</span>
            </div>

            <Separator className="my-4" />

            <RichText content={product.description} />

            <div className="flex items-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span>{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                disabled={quantity >= 10}
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                variant="signature"
                className="w-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </PhotoProvider>
  );
};

export default ProductDetails;
