"use client";

import { H3 } from "@/components/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedSubCategoryId } from "@/lib/store/slices/productSlice";

const Subcategories = () => {
  const dispatch = useAppDispatch();
  const { subCategories, selectedSubCategoryId } = useAppSelector(
    (store) => store.product
  );
  if (!subCategories?.length) return;
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
          {subCategories.map((subcategory) => (
            <CarouselItem
              key={subcategory.id}
              className="basis-auto cursor-pointer"
              onClick={() => dispatch(setSelectedSubCategoryId(subcategory.id))}
            >
              <div
                className={`px-4 py-2 ${
                  selectedSubCategoryId == subcategory.id
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
