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
import { ShoppingCart } from "lucide-react";

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
              className="pl-3 basis-auto w-36 cursor-pointer"
            >
              <div
                className={`flex flex-col items-center rounded-2xl p-3 shadow-md bg-card border border-transparent transition-all duration-200 hover:shadow-lg  ${
                  selectedCategoryId == category.id
                    ? "border-signature ring-signature bg-signature/10 dark:bg-signature/20 border-signature/50"
                    : "hover:border-signature/30"
                }`}
              >
                <div className="w-full aspect-square rounded-xl bg-background shadow-inner flex items-center justify-center group overflow-hidden">
                  <MyImage
                    src={category.image}
                    alt={category.name}
                    width={120}
                    height={120}
                    className="object-contain w-full h-full transition-transform duration-200 hover:scale-110"
                  />
                </div>
                <span className="text-sm font-semibold text-center text-foreground line-clamp-1 mt-1">
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
