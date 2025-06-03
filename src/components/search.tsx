"use client";

import { Search } from "lucide-react";
import Link from "next/link";

const SearchProducts = () => {
  return (
    <Link
      href="/search"
      className="rounded-full bg-muted border-2 size-9 flex items-center justify-center"
    >
      <Search className="w-5 h-5" />
    </Link>
  );
};

export default SearchProducts;
