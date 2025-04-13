// components/Subcategories.tsx
"use client";
import { useProductStore } from "@/store/product-store";

const Subcategories = () => {
  const subcategories = useProductStore((state) => state.subcategories);
  const selectedCategoryId = useProductStore(
    (state) => state.selectedCategoryId
  );
  const selectedSubcategoryId = useProductStore(
    (state) => state.selectedSubcategoryId
  );
  const setSelectedSubcategory = useProductStore(
    (state) => state.setSelectedSubcategory
  );

  const filteredSubcategories = subcategories.filter(
    (subcat) => subcat.categoryId === selectedCategoryId
  );

  const handleSubcategorySelect = (id: string) => {
    setSelectedSubcategory(id); // Update the selected subcategory in the store
  };

  return (
    <div className="flex flex-wrap gap-4">
      {filteredSubcategories.map((subcat) => (
        <div
          key={subcat.id}
          className={`p-4 cursor-pointer ${
            subcat.id === selectedSubcategoryId
              ? "border-2 border-blue-500"
              : ""
          }`}
          onClick={() => handleSubcategorySelect(subcat.id)}
        >
          {subcat.name}
        </div>
      ))}
    </div>
  );
};

export default Subcategories;
