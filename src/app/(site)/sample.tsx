"use client";

import Container from "@/components/container";
import { H3 } from "@/components/typography";
import { useCategoryStore } from "@/store";
import { useProductStore } from "@/store/product-store";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/cards/product-card";
import Link from "next/link";

const Categories = () => {
  const categories = useCategoryStore((state) => state.categories);

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
            <CarouselItem key={category.id} className="pl-4 basis-auto w-40">
              <div className="flex flex-col items-center gap-4 rounded-lg overflow-hidden">
                <img
                  src={category.image}
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

const Subcategories = () => {
  const subcategories = useProductStore((state) => state.subcategories);
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
          {subcategories.map((subcategory) => (
            <CarouselItem key={subcategory.id} className="basis-auto mr-3">
              <div className="px-4 py-2 bg-signature text-white rounded-full text-sm font-semibold whitespace-nowrap">
                {subcategory.name}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const Products = () => {
  const products = useProductStore((state) => state.products);
  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Products</H3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard
              image={product.image}
              title={product.name}
              originalPrice={product.price}
              discountedPrice={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

const Sample = () => {
  return (
    <Container>
      <Categories />
      <Subcategories />
      <Products />
    </Container>
  );
};

export default Sample;
