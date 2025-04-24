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
import { useSubCategories } from "@/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedSubCategoryId } from "@/lib/store/slices/productSlice";
import { Subcategory } from "@/types";

const Subcategories = () => {
  const dispatch = useAppDispatch();
  const { selectedSubCategoryId, selectedCategoryId } = useAppSelector(
    (store) => store.product
  );

  const { data, isLoading, isError, error } = useSubCategories(
    selectedCategoryId || ""
  );

  const subCategories = data?.data?.subCategories || [];

  useEffect(() => {
    if (isError && error) {
      console.error("Error loading subcategories:", error);
      toast.error("Failed to load subcategories.");
    }
  }, [isError, error]);

  if (isLoading) return <SubcategoriesSkeleton />;

  if (selectedCategoryId && !subCategories.length) {
    return (
      <div className="my-8">
        <H3 className="text-center mb-6">Subcategories</H3>
        <p className="text-center text-muted-foreground">
          No subcategories found.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Subcategories</H3>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full px-4"
      >
        <CarouselContent>
          {subCategories.map((subcategory: Subcategory) => (
            <CarouselItem
              key={subcategory.id}
              className="basis-auto cursor-pointer"
              onClick={() => dispatch(setSelectedSubCategoryId(subcategory.id))}
            >
              <div
                className={`px-4 py-2 ${
                  selectedSubCategoryId === subcategory.id
                    ? "border bg-signature/20"
                    : "bg-secondary hover:bg-signature/10 hover:shadow transition"
                } text-foreground rounded-full text-sm font-semibold whitespace-nowrap`}
              >
                {subcategory.name}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Subcategories;

// Skeleton while loading
const SubcategoriesSkeleton = () => {
  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Subcategories</H3>
      <div className="flex gap-3 px-4 overflow-x-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-24 rounded-full shrink-0" />
        ))}
      </div>
    </div>
  );
};
