// components/Subcategories.tsx
"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedSubCategoryId } from "@/lib/store/slices/productSlice";

const Subcategories = () => {
  const dispatch = useAppDispatch();
  const { subCategories, selectedSubCategoryId } = useAppSelector(
    (state) => state.product
  );

  const handleSubcategorySelect = (id: string) => {
    dispatch(setSelectedSubCategoryId(id)); // Update the selected subcategory in the store
  };

  return (
    <div className="flex flex-wrap gap-4">
      {subCategories.map(({ id, name }) => (
        <div
          key={id}
          className={`p-4 cursor-pointer ${
            id === selectedSubCategoryId ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => handleSubcategorySelect(id)}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default Subcategories;
