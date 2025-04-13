"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star } from "lucide-react";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [quantity, setQuantity] = useState(1);
  const product = {
    id: "123",
    title: "Wireless Speaker",
    price: 19.0,
    oldPrice: 39.0,
    description:
      "Wireless Microphone with the new style, shockproof, clear voice reception. Best suitable for recording, online meeting, vlogging, and calling.",
    images: [
      "/images/product.png",
      "/images/product.png",
      "/images/product.png",
    ],
    reviews: [
      {
        name: "Vanille",
        rating: 5,
        comment: "Lorem ipsum dolor sit amet...",
        time: "1 Month Ago",
      },
      {
        name: "Madun",
        rating: 5,
        comment: "Lorem ipsum dolor sit amet...",
        time: "1 Month Ago",
      },
      {
        name: "Samantha",
        rating: 5,
        comment: "Lorem ipsum dolor sit amet...",
        time: "1 Month Ago",
      },
      {
        name: "Roveria",
        rating: 5,
        comment: "Lorem ipsum dolor sit amet...",
        time: "1 Month Ago",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Image Section */}
      <div>
        <div className="rounded-2xl overflow-hidden bg-red-100 p-4">
          <Image
            src={product.images[0]}
            alt="Product"
            width={400}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className="flex justify-center gap-3 mt-4">
          {product.images.map((img, idx) => (
            <div key={idx} className="border rounded-xl p-1">
              <Image src={img} alt="thumb" width={60} height={60} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Content Section */}
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          Product &gt;{" "}
          <span className="text-red-500 font-medium">{product.title}</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <div className="flex items-center text-sm mb-2">
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="ml-2">(12 Reviews)</span> |{" "}
          <span className="ml-2 text-muted-foreground">Sold 99</span>
        </div>

        {/* Price */}
        <div className="text-xl font-semibold mb-2">
          ${product.price.toFixed(2)}
          <span className="line-through text-muted-foreground ml-2">
            ${product.oldPrice.toFixed(2)}
          </span>
          <span className="text-red-500 ml-2">Save 50%</span>
        </div>

        {/* Badges */}
        <div className="flex gap-3 mb-3">
          <Badge variant="outline">Free Delivery</Badge>
          <Badge variant="outline">In Stock</Badge>
          <Badge variant="destructive">Add to Wishlist</Badge>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4">{product.description}</p>

        {/* Quantity and Buttons */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-medium">Quantity</span>
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={16} />
            </Button>
            <span className="px-4">{quantity}</span>
            <Button variant="ghost" onClick={() => setQuantity(quantity + 1)}>
              <Plus size={16} />
            </Button>
          </div>
          <Button variant="default">Buy</Button>
          <Button variant="destructive">Add to Cart</Button>
        </div>

        <Separator />
      </div>

      {/* Full Width Reviews Section */}
      <div className="col-span-full mt-10">
        <Tabs defaultValue="reviews">
          <TabsList className="mb-4">
            <TabsTrigger value="reviews">Reviews (200)</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
          </TabsList>

          {/* Ratings Summary */}
          <TabsContent value="reviews">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="bg-red-500 text-white rounded-xl p-6 w-full md:w-1/3 text-center">
                <div className="text-4xl font-bold">
                  4.9<span className="text-xl font-normal">/5</span>
                </div>
                <div className="text-yellow-400 flex justify-center mt-2 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <div className="text-sm">223 Reviews</div>
              </div>

              <div className="flex-1 space-y-6">
                {product.reviews.map((review, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {review.time}
                      </span>
                    </div>
                    <div className="text-yellow-500 flex mb-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="description">
            <p>{product.description}</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductPage;
