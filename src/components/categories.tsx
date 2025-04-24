"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { H3 } from "@/components/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useProducts";
import { useAppSelector } from "@/lib/store/hooks";
import { setSelectedCategoryId } from "@/lib/store/slices/productSlice";
import { Category } from "@/types";
import { useDispatch } from "react-redux";
import MyImage from "./my-image";

const Categories = () => {
  const { data: categories, isLoading, isError, error } = useCategories();
  const { selectedCategoryId } = useAppSelector((store) => store.product);
  const dispatch = useDispatch();

  // Toast on error
  useEffect(() => {
    if (isError) {
      console.error("Error loading categories:", error);
      toast.error("Failed to load categories.");
    }
  }, [isError, error]);

  // Show loading skeletons
  if (isLoading) return <CategoriesSkeleton />;

  // Show message if no categories
  if (!categories?.data?.categories?.length) {
    return (
      <div className="my-8">
        <H3 className="text-center mb-6">Categories</H3>
        <p className="text-center text-muted-foreground">
          No categories found.
        </p>
      </div>
    );
  }

  // Main content
  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Categories</H3>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {categories.data.categories.map((category: Category) => (
            <CarouselItem
              key={category.id}
              onClick={() => dispatch(setSelectedCategoryId(category.id))}
              className="pl-4 basis-auto w-40 cursor-pointer"
            >
              <div
                className={`flex flex-col items-center gap-4 rounded-lg overflow-hidden p-4 ${
                  selectedCategoryId == category.id
                    ? "border bg-signature/20"
                    : "bg-secondary"
                }`}
              >
                <MyImage
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="w-full h-28 object-cover rounded-lg hover:scale-105 transition-transform"
                />
                <span className="text-sm font-semibold line-clamp-1 text-center">
                  {category.name}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Categories;

// Skeleton component
const CategoriesSkeleton = () => {
  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Categories</H3>
      <div className="flex gap-4 px-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 rounded-lg overflow-hidden p-4 bg-secondary w-40 shrink-0"
          >
            <Skeleton className="w-full aspect-square rounded-lg" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
};
