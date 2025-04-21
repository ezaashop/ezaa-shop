"use client";

import Container from "@/components/container";
import { H3 } from "@/components/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/cards/product-card";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { baseUrl } from "@/config/constants";
import { useDispatch } from "react-redux";
import {
  setSelectedCategoryId,
  setSelectedSubCategoryId,
} from "@/lib/store/slices/productSlice";

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
                    : "bg-secondary"
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

const Products = () => {
  const { products } = useAppSelector((store) => store.product);
  if (!products?.length) return;
  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Products</H3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map(({ id, product_image, name, product_deatils }) => (
          <Link key={id} href={`/products/${id}`}>
            <ProductCard
              image={product_image}
              title={name}
              product_deatils={product_deatils}
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
