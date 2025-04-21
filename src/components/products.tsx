// components/Products.tsx
"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, selectedSubCategoryId } = useAppSelector(
    (store) => store.product
  );

  const filteredProducts = products.filter(
    (product) => product.subcategoryId === selectedSubCategoryId
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <div key={product.id} className="p-4 border rounded-lg shadow">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover"
          />
          <h3 className="text-lg mt-2">{product.name}</h3>
          <p className="text-sm text-gray-500">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
