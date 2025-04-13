"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useProductStore } from "@/store/product-store";
import Image from "next/image";

type CategoriesProps = {
  carousel?: boolean;
};

const Categories = ({ carousel }: CategoriesProps) => {
  const categories = useProductStore((state) => state.categories);
  const selectedCategoryId = useProductStore(
    (state) => state.selectedCategoryId
  );
  
  const setSelectedCategory = useProductStore(
    (state) => state.setSelectedCategory
  );

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id); // Update the selected category in the store
  };

  const renderCard = (cat: (typeof categories)[number]) => (
    <CarouselItem
      key={cat.id}
      className="flex flex-col items-center justify-center rounded-xl shadow p-4 bg-white text-center w-[200px] h-[200px] cursor-pointer"
    >
      <div
        className={`w-full h-full relative rounded-xl ${
          cat.id === selectedCategoryId ? "border-2 border-blue-500" : ""
        }`}
        onClick={() => handleCategorySelect(cat.id)}
      >
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <p className="text-sm mt-2">{cat.name}</p>
    </CarouselItem>
  );

  return (
    <Carousel opts={{ align: "start" }} className="w-full overflow-x-scroll">
      <CarouselContent className="flex space-x-4">
        {categories.map(renderCard)}
      </CarouselContent>
    </Carousel>
  );
};

export default Categories;
