"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { ProductCard } from "@/components/cards/product-card";
import { Button } from "@/components/ui/button"; // For a possible reload or back button
import Link from "next/link";
import Loader from "@/components/loader";

const FavoritesPage = () => {
  const { favorites } = useAppSelector((store) => store.favorite);

  console.log(favorites, "favorites");

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold mb-2">No products yet</h2>
        <p className="text-muted-foreground mb-4">
          Explore products and add them to your favorites.
        </p>
        <Link href="/">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map(
          ({ products: { id, product_image, name, product_deatils } }) => (
            <ProductCard
              key={id}
              id={id}
              image={product_image}
              title={name}
              product_deatils={product_deatils}
            />
          )
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
