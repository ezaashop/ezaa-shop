"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { Product } from "@/types";
import Link from "next/link";
import MyImage from "./my-image";
import { Separator } from "./ui/separator";

interface PopularProducts {
  product_id: string;
  products: Product;
}

const SearchProducts = () => {
  const [input, setInput] = useState("");
  const popularProducts = useAppSelector(
    (store) => store.product.popularProducts
  ) as PopularProducts[];

  // Filter products based on search input
  const filteredProducts = popularProducts.filter(({ products }) => {
    const searchText = input.toLowerCase();
    const nameMatch = products.name.toLowerCase().includes(searchText);
    const descriptionMatch = products.description
      ?.toLowerCase()
      .includes(searchText);
    return nameMatch || descriptionMatch;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Search className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle>Search Products</DialogTitle>
        <DialogDescription>Find your favorite products here.</DialogDescription>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Separator />
          <ScrollArea className="h-[300px]">
            <div className="flex flex-col gap-4">
              {input.trim() === "" ? (
                <div className="text-center text-gray-500">
                  Start typing to search products.
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map(({ products }) => (
                  <ProductCard key={products.id} product={products} />
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No products found.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchProducts;

const ProductCard = ({ product }: { product: Product }) => {
  const { id, product_image, name, product_deatils } = product || {};
  const { price, selling_price } = product_deatils[0] || {};

  return (
    <Link
      href={`/products/${id}`}
      className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition-all"
    >
      <div className="flex-shrink-0">
        <MyImage
          src={product_image?.[0]?.image || "/placeholder.png"}
          alt={name || "Product Image"}
          width={60}
          height={60}
          className="rounded-md object-cover w-10 aspect-square"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{name}</span>
        <div className="text-sm text-muted-foreground">
          <span className="line-through mr-2">
            {price ? `Rs. ${price}` : ""}
          </span>
          <span className="text-signature font-semibold">
            {selling_price ? `Rs. ${selling_price}` : ""}
          </span>
        </div>
      </div>
    </Link>
  );
};
