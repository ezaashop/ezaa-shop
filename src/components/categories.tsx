"use client";

import { H3 } from "@/components/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { baseUrl } from "@/config/constants";
import { useAppSelector } from "@/lib/store/hooks";
import { setSelectedCategoryId } from "@/lib/store/slices/productSlice";
import { useDispatch } from "react-redux";

const Categories = () => {
  const { categories, selectedCategoryId } = useAppSelector(
    (store) => store.product
  );
  const dispatch = useDispatch();
  if (!categories?.length) return;
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
          {categories.map((category) => (
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
                <img
                  src={baseUrl + "/" + category.image}
                  alt={category.name}
                  className="w-full aspect-square object-cover rounded-lg hover:scale-105 transition-transform"
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
