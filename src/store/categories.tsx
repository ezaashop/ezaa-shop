// store/categories.ts
import { Category } from "@/types";
import { create } from "zustand";

interface CategoriesState {
  categories: Category[];
}

export const useCategoryStore = create<CategoriesState>(() => ({
  categories: [
    { id: "1", name: "Electronics", image: "/images/category.png" },
    { id: "2", name: "Computers", image: "/images/category.png" },
    { id: "3", name: "Cameras", image: "/images/category.png" },
    { id: "4", name: "Mobiles", image: "/images/category.png" },
    { id: "5", name: "Smart Watches", image: "/images/category.png" },
    { id: "6", name: "Home Appliances", image: "/images/category.png" },
    { id: "7", name: "Gaming", image: "/images/category.png" },
    { id: "8", name: "TV & Box", image: "/images/category.png" },
    { id: "9", name: "Audio", image: "/images/category.png" },
    { id: "10", name: "Accessories", image: "/images/category.png" },
  ],
}));
