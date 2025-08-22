"use client";

import { ProductCard } from "@/components/cards/product-card";
import Container from "@/components/container";
import { Button } from "@/components/ui/button"; // For a possible reload or back button
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";

const FavoritesPage = () => {
  const { favorites } = useAppSelector((store) => store.favorite);

  if (favorites.length === 0) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold mb-2">No products yet</h2>
        <p className="text-muted-foreground mb-4">
          Explore products and add them to your favorites.
        </p>
        <Link href="/">
          <Button>Browse Products</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container title="Favorites">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map(({ products }: any) => (
          <ProductCard key={products.id} product={products} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesPage;
