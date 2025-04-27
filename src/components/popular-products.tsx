"use client";

import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { H3 } from "@/components/typography";
import { ProductCard } from "@/components/cards/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePopularProducts, useProduct } from "@/hooks/useProducts";
import { useAppSelector } from "@/lib/store/hooks";
import { Product } from "@/types";

const PopularProducts = () => {
  const { userId } = useAppSelector((store) => store.auth);
  const {
    selectedSubCategoryId,
    popularProducts: products,
    popularProductsLoading: isLoading,
    popularProductsError: error,
  } = useAppSelector((store) => store.product);

  useEffect(() => {
    if (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products.");
    }
  }, [error]);

  if (isLoading) return <ProductsSkeleton />;

  if (selectedSubCategoryId && !products.length) {
    return (
      <div className="my-8">
        <H3 className="text-center mb-6">Popular Products</H3>
        <p className="text-center text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Popular Products</H3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products
          .slice(0, 12)
          .map((product: { product_id: string; products: Product }) => (
            <ProductCard key={product.product_id} product={product.products} />
          ))}
      </div>
    </div>
  );
};

export default PopularProducts;

// Skeleton while loading
const ProductsSkeleton = () => {
  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Popular Products</H3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
};
