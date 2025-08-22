"use client";

import { ProductCard } from "@/components/cards/product-card";
import { H3 } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/useProducts";
import { useAppSelector } from "@/lib/store/hooks";
import { Product } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";

const Products = () => {
  const { userId } = useAppSelector((store) => store.auth);
  const { selectedSubCategoryId } = useAppSelector((store) => store.product);

  // Use -1 as default userId for product fetching if user is not registered
  const effectiveUserId = userId || -1;

  const { data, isLoading, isError, error } = useProduct(
    selectedSubCategoryId || 0,
    effectiveUserId
  );

  const products = data?.data?.products || [];

  useEffect(() => {
    if (isError && error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products.");
    }
  }, [isError, error]);

  if (isLoading) return <ProductsSkeleton />;

  if (selectedSubCategoryId && !products.length) {
    return (
      <div className="my-8">
        <H3 className="text-center mb-6">Products</H3>
        <p className="text-center text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Products</H3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

// Skeleton while loading
const ProductsSkeleton = () => {
  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Products</H3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
};
