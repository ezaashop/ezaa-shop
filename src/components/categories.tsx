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
    <div className="my-8"  >
      <H3 className="text-center mb-6">Categories</H3>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="px-3">
          {categories.data.categories.map((category: Category) => (
            <CarouselItem
              key={category.id}
              onClick={() => dispatch(setSelectedCategoryId(category.id))}
              className="basis-auto w-32 cursor-pointer"
            >
          <div
  className={`flex flex-col items-center rounded-xl transition-all duration-200 ${
    selectedCategoryId === category.id
      ? "bg-signature/50 border-2 border-red"
      : "hover:bg-signature/15 hover:border-1 border-1  border-gray hover:border-red bg-muted/70"
  }`}
>
  <MyImage
    src={category.image}
    alt={category.name}
    width={80}
    height={80}
    className="w-full h-22 object-contain bg-white transition-transform hover:scale-90 rounded-t-lg"
  />
  <span className="text-xs font-medium gap-2 p-2 text-center text-foreground px-1 truncate w-full">
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
      <div className="flex gap-4 px-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 rounded-xl overflow-hidden p-3 bg-muted/50 w-32 shrink-0"
          >
            <Skeleton className="w-full h-20 rounded-md" />
            <Skeleton className="w-3/4 h-3" />
          </div>
        ))}
      </div>
    </div>
  );
};
