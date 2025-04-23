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

export default Products;
