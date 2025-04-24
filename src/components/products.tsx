"use client";

import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { H3 } from "@/components/typography";
import { ProductCard } from "@/components/cards/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/useProducts";
import { useAppSelector } from "@/lib/store/hooks";
import { Product } from "@/types";

const Products = () => {
  const { userId } = useAppSelector((store) => store.auth);
  const { selectedSubCategoryId } = useAppSelector((store) => store.product);

  const { data, isLoading, isError, error } = useProduct(
    selectedSubCategoryId || "",
    userId || ""
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
        {products.map(
          ({ id, product_image, name, product_deatils }: Product) => (
            <Link key={id} href={`/products/${id}`}>
              <ProductCard
                image={product_image}
                title={name}
                product_deatils={product_deatils}
              />
            </Link>
          )
        )}
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
